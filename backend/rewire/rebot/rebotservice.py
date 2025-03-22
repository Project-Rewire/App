import json
from textwrap import dedent
from openai import OpenAI
from typing import List, Dict, Any, Optional


class Rebot:
    def __init__(self, model: str = "gpt-4o-2024-08-06", conversation_history: Optional[List[Dict[str, str]]] = None):
        
        # api_key = os.environ.get("OPENAI_API_KEY")
        api_key = "REAL_OPENAI_API_KEY"
        
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable not set")
        
        self.openai = OpenAI(api_key=api_key)
        self.model = model
        self.therapist_prompt = dedent("""
            You are a helpful mental health therapist.
            Your role involves conversing with users who have behavioral addictions, such as social media addiction.
            Your responsibility is to engage in meaningful and caring conversations with users and provide helpful replies.
            Please use scientific techniques, such as Cognitive Behavioral Therapy, when conversing with the user.
            You always answers in a short direct manner.
        """)
        self.response_format = {
            "type": "json_schema",
            "json_schema": {
                "name": "mental_health_therapist",
                "schema": {
                    "type": "object",
                    "properties": {
                        "reply": {"type": "string"},
                    },
                    "required": ["reply"]
                }
            }
        }
        self.conversation_history = conversation_history if conversation_history is not None else []
        
    def reply(self, message: str) -> Dict[str, Any]:
        """
        Generate a reply to the user's message.
        
        Args:
            message: The user's message
            
        Returns:
            A dictionary containing the assistant's reply and possibly a recovery plan
        """

        self.conversation_history.append({"role": "user", "content": message})
        messages = [{"role": "system", "content": self.therapist_prompt}]
        messages.extend(self.conversation_history)
        
        try:
            response = self.openai.chat.completions.create(
                model=self.model,
                messages=messages,
                response_format=self.response_format,
                temperature=0.7,
                max_tokens=1000
            )

            content = response.choices[0].message.content
            parsed_content = json.loads(content)

            self.conversation_history.append({
                "role": "assistant", 
                "content": content
            })
            
            return parsed_content
            
        except Exception as e:
            error_msg = f"Error generating response: {str(e)}"
            print(error_msg)
            return {"reply": "I'm sorry, I encountered an error. Please try again."}
    
    def clear_history(self) -> None:
        """Clear the conversation history."""
        self.conversation_history = []
        
    def get_conversation_history(self) -> List[Dict[str, str]]:
        """Get the current conversation history."""
        return self.conversation_history
        
    def set_conversation_history(self, conversation_history: List[Dict[str, str]]) -> None:
        """
        Set the conversation history directly from a parameter.
        
        Args:
            conversation_history: List of message dictionaries with 'role' and 'content' keys
        """
        self.conversation_history = conversation_history