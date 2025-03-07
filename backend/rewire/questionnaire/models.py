from django.db import models

class QuestionnaireQuestion(models.Model):
    ANSWER_FORMATS = [
        ("SINGLE", "Single"),
        ("MULTIPLE", "Multiple")
    ]
    
    title = models.CharField(max_length=450)
    answer_format = models.CharField(max_length=20, choices=ANSWER_FORMATS)
    available_answers = models.JSONField(default=list)

    def __str__(self):
        return self.title
