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
        self.room_group_name = f"rebot_{self.room_name}"
        
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
        
        # Try to load previous conversation, if available
        try:
            # This could be replaced with database retrieval
            self.load_conversation_from_db()
        except Exception as e:
            print(f"Could not load conversation: {e}")
        
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

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
        # Save conversation before disconnecting
        try:
            self.save_conversation_to_db()
        except Exception as e:
            print(f"Error saving conversation: {e}")
            
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        try:
            data = json.loads(text_data)
            
            # Handle different message types
            if data.get("type") == "message":
                message = data.get("content", "")
                
                # Process the message and get response from Rebot
                response = self.rebot.reply(message)
                
                # Format the response for sending back
                reply_content = response.get("reply", "I'm sorry, I couldn't process that.")
                
                # Check if there's a recovery plan
                recovery_plan = response.get("recovery_plan", [])
                
                response_data = {
                    "type": "message",
                    "sender": "therapist",
                    "content": reply_content,
                    "timestamp": time.time()
                }
                
                # Add recovery plan if it exists
                if recovery_plan:
                    response_data["recovery_plan"] = recovery_plan
                
                # Send response directly back to the WebSocket
                self.send(text_data=json.dumps(response_data))
                
                # Also broadcast to the room group so other clients get the message
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name, {"type": "rebot_message", "message": response_data}
                )
            
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

    # Receive message from room group
    def rebot_message(self, event):
        message = event["message"]
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))

    # Helper methods for conversation persistence
    def load_conversation_from_db(self):
        """
        Load conversation history from the database for the current user.
        This is a placeholder - implement based on your database model.
        """
        # try:
        #     conversation = Conversation.objects.get(user_id=self.user_id)
        #     self.rebot.set_conversation_history(json.loads(conversation.history))
        # except Conversation.DoesNotExist:
        #     pass
        pass

    def save_conversation_to_db(self):
        """
        Save the current conversation history to the database.
        This is a placeholder - implement based on your database model.
        """
        # conversation, created = Conversation.objects.get_or_create(user_id=self.user_id)
        # conversation.history = json.dumps(self.rebot.get_conversation_history())
        # conversation.save()
        pass
    
    def export_chat_json(self):
        """Export the conversation history as JSON string"""
        chat_export = []
        for msg in self.rebot.get_conversation_history():
            if msg["role"] == "assistant":
                # parse the JSON content to extract the reply
                try:
                    content_dict = json.loads(msg["content"])
                    formatted_msg = {
                        "sender": "therapist",
                        "content": content_dict.get("reply", ""),
                        "timestamp": time.time()
                    }
                    
                    # Add recovery plan if it exists
                    if "recovery_plan" in content_dict and content_dict["recovery_plan"]:
                        formatted_msg["recovery_plan"] = content_dict["recovery_plan"]
                    
                    chat_export.append(formatted_msg)
                except json.JSONDecodeError:
                    # Fallback if the content isn't valid JSON
                    chat_export.append({
                        "sender": "therapist",
                        "content": msg["content"],
                        "timestamp": time.time()
                    })
            elif msg["role"] == "user":
                chat_export.append({
                    "sender": "user",
                    "content": msg["content"],
                    "timestamp": time.time()
                })
        
        return json.dumps(chat_export)
    
    def export_chat_text(self):
        """Export the conversation history as text"""
        text_lines = []
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        text_lines.append(f"Chat Export - {timestamp}\n")
        
        for msg in self.rebot.get_conversation_history():
            if msg["role"] == "user":
                text_lines.append(f"Patient: {msg['content']}")
            elif msg["role"] == "assistant":
                try:
                    content_dict = json.loads(msg["content"])
                    text_lines.append(f"Therapist: {content_dict.get('reply', '')}")
                    
                    # Add recovery plan if it exists
                    if "recovery_plan" in content_dict and content_dict["recovery_plan"]:
                        text_lines.append("\nRecovery Plan:")
                        for i, task in enumerate(content_dict["recovery_plan"], 1):
                            task_line = f"{i}. {task['task']}"
                            if "rationale" in task and task["rationale"]:
                                task_line += f" - {task['rationale']}"
                            text_lines.append(task_line)
                        text_lines.append("")  # empty line after recovery plan
                except json.JSONDecodeError:
                    # fallback if the content isn't valid JSON
                    text_lines.append(f"Therapist: {msg['content']}")
            
            text_lines.append("")  # empty line between messages
        
        return "\n".join(text_lines)