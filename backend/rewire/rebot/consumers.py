import json
import time
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .rebotservice import Rebot

class RebotConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.rebot = None
        self.user_id = None

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        
        # Try to get user_id from URL or session
        if "user_id" in self.scope["url_route"]["kwargs"]:
            self.user_id = self.scope["url_route"]["kwargs"]["user_id"]
        elif self.scope.get("user") and self.scope["user"].is_authenticated:
            self.user_id = self.scope["user"].id
        else:
            # Fallback to using room_name as identifier if no user_id
            self.user_id = self.room_name
        
        # Initialize Rebot instance
        self.rebot = Rebot()
        
        self.accept()
        
        # Send welcome message if starting a new conversation
        if not self.rebot.get_conversation_history():
            welcome_msg = {
                "type": "message",
                "sender": "therapist",
                "content": "Hello! I'm your recovery assistant. How can I help you today?",
                "timestamp": time.time()
            }
            self.send(text_data=json.dumps(welcome_msg))

    def disconnect(self, close_code):
        # Clean up resources if needed
        pass

    def receive(self, text_data):
        try:
            data = json.loads(text_data)
            
            # Handle different message types
            if data.get("type") == "message":
                message = data.get("content", "")

                # Get response from Rebot
                response = self.rebot.reply(message)
                reply_content = response.get("reply", "I'm sorry, I couldn't process that.")
                
                response_data = {
                    "type": "message",
                    "sender": "therapist",
                    "content": reply_content,
                    "timestamp": time.time()
                }
                
                # Send response directly back to the WebSocket
                self.send(text_data=json.dumps(response_data))
            
            elif data.get("type") == "clear_history":
                self.rebot.clear_history()
                self.send(text_data=json.dumps({
                    "type": "system",
                    "content": "Conversation history cleared"
                }))
                
            elif data.get("type") == "export_chat":
                format_type = data.get("format", "text")
                chat_export = None
                
                if format_type == "json":
                    chat_export = self.export_chat_json()
                elif format_type == "text":
                    chat_export = self.export_chat_text()
                
                if chat_export:
                    self.send(text_data=json.dumps({
                        "type": "export",
                        "format": format_type,
                        "content": chat_export
                    }))
                
        except json.JSONDecodeError:
            self.send(text_data=json.dumps({
                "type": "error",
                "content": "Invalid message format"
            }))
        except Exception as e:
            self.send(text_data=json.dumps({
                "type": "error",
                "content": f"Error processing message: {str(e)}"
            }))