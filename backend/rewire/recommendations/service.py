import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from aiprofile.models import AIProfile
from typing import Any, Dict, List, Optional

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

class RecommendationsService:

    def __init__(self, api_key=OPENAI_API_KEY, model: str = "gpt-4o-2024-08-06"):
        self.openAI = OpenAI(api_key=api_key)
        self.model = model

    def generate_recommendations(self, user_id: int, difficulty: str = None, count: int = 3) -> List[Dict[str, Any]]:
        try:
            user_profile = AIProfile.objects.filter(user_id=user_id).first()
            
            
            if user_profile:
                context = f"The user has been dealing with {user_profile.addiction_type} addiction for {user_profile.addiction_duration_months} months."
            else:
                context = "The user is working on overcoming a behavioral addiction."
            
            # Adjust difficulty context
            difficulty_context = ""
            if difficulty:
                difficulty_context = f"The difficulty level should be {difficulty.lower()}."
                
            prompt = f"""
            You are a recovery coach specializing in behavioral addictions. {context}
            
            Please generate {count} task recommendations that would help the user in their recovery journey. {difficulty_context}
            
            For each task, provide:
            1. A clear title (maximum 100 characters)
            2. A detailed description explaining the task and its benefits
            3. Difficulty level (EASY, MEDIUM, or HARD)
            4. Appropriate marks/points (1-5 for EASY, 5-10 for MEDIUM, 10-15 for HARD)
            
            Format your response as a JSON array of task objects.
            """
            
            response_format = {
                "type": "json_object",
                "schema": {
                    "type": "object",
                    "properties": {
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "title": {"type": "string"},
                                    "description": {"type": "string"},
                                    "difficulty": {"type": "string", "enum": ["EASY", "MEDIUM", "HARD"]},
                                    "marks": {"type": "integer"}
                                },
                                "required": ["title", "description", "difficulty", "marks"]
                            }
                        }
                    },
                    "required": ["tasks"]
                }
            }
            
            # Make API call to OpenAI
            response = self.openai.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a recovery coach who generates helpful tasks for people overcoming behavioral addictions."},
                    {"role": "user", "content": prompt}
                ],
                response_format=response_format,
                temperature=0.7,
                max_tokens=2000
            )
            
            content = response.choices[0].message.content
            parsed_content = json.loads(content)
            
            return parsed_content.get("tasks", [])
            
        except Exception as e:
            print(f"Error generating recommendations: {str(e)}")
            # generate tasks using pre defined fallback tasks if API call fails
            return self._generate_fallback_tasks(difficulty)
    
    # Generate fallback tasks in case the API call fails
    def _generate_fallback_tasks(self, difficulty: Optional[str] = None) -> List[Dict[str, Any]]:
        fallback_tasks = [
            {
                "title": "Practice Mindfulness for 10 Minutes",
                "description": "Set aside 10 minutes to practice mindfulness meditation. Focus on your breath and observe your thoughts without judgment.",
                "difficulty": "EASY",
                "marks": 3
            },
            {
                "title": "Digital Detox for 2 Hours",
                "description": "Take a break from all digital devices for 2 consecutive hours. Use this time to connect with your surroundings or engage in an offline activity.",
                "difficulty": "MEDIUM",
                "marks": 7
            },
            {
                "title": "Complete a Week-long Habit Tracking Journal",
                "description": "Create and maintain a detailed journal tracking your habits, triggers, and responses for an entire week. Identify patterns and plan improvements.",
                "difficulty": "HARD",
                "marks": 12
            }
        ]
        
        if difficulty:
            return [task for task in fallback_tasks if task["difficulty"] == difficulty.upper()]
        return fallback_tasks


    