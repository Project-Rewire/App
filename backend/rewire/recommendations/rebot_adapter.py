from typing import Dict, List, Any, Optional 
from core.models import User

class RebotDataAdapter:

    @staticmethod
    def get_user_conversation_history(user_id: int) -> List[Dict[str, Any]]:
        try:
            from rebot.rebotservice import Rebot
            
            # Get user
            user = User.objects.get(id=user_id)
            
            # Initialize Rebot instance
            rebot = Rebot()
            
            # Return conversation history
            return rebot.get_conversation_history()
            
        except User.DoesNotExist:
            return []
        except Exception as e:
            print(f"Error getting user conversation history: {str(e)}")
            return []
        
    
    @staticmethod
    def extract_user_parameters(conversation_history: List[Dict[str, str]]) -> Dict[str, Any]:

        parameters = {
            "addiction_types": [],
            "triggers": [],
            "severity": None,
            "goals": []
        }
        
        for message in conversation_history:
            if message.get("role") == "user":
                content = message.get("content", "").lower()
                
                if "addicted to" in content:
                    addiction = content.split("addicted to")[1].split(".")[0].strip()
                    parameters["addiction_types"].append(addiction)
                
                if "trigger" in content:
                    parameters["triggers"].append(content)
                
                if "goal" in content:
                    parameters["goals"].append(content)
        
        return parameters