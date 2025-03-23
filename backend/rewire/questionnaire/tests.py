from django.test import TestCase
from .models import QuestionnaireQuestion

class QuestionnaireQuestionModelTest(TestCase):

    def test_create_single_answer_question(self):
        question = QuestionnaireQuestion.objects.create(
            title="How often do you experience cravings?",
            answer_format="SINGLE",
            available_answers=["Never", "Rarely", "Occasionally", "Frequently", "Always"]
        )
        self.assertEqual(question.title, "How often do you experience cravings?")
        self.assertEqual(question.answer_format, "SINGLE")
        self.assertEqual(question.available_answers, ["Never", "Rarely", "Occasionally", "Frequently", "Always"])

    def test_create_multiple_answer_question(self):
        question = QuestionnaireQuestion.objects.create(
            title="What triggers your cravings? (Select all that apply)",
            answer_format="MULTIPLE",
            available_answers=["Stress", "Social situations", "Boredom", "Certain people", "Other"]
        )
        self.assertEqual(question.title, "What triggers your cravings? (Select all that apply)")
        self.assertEqual(question.answer_format, "MULTIPLE")
        self.assertEqual(question.available_answers, ["Stress", "Social situations", "Boredom", "Certain people", "Other"])

    def test_answer_format_choices(self):
        single_question = QuestionnaireQuestion.objects.create(
            title="How confident are you in overcoming your addiction?",
            answer_format="SINGLE",
            available_answers=["Not confident", "Somewhat confident", "Very confident"]
        )
        multiple_question = QuestionnaireQuestion.objects.create(
            title="What strategies have you tried to overcome addiction? (Select all that apply)",
            answer_format="MULTIPLE",
            available_answers=["Therapy", "Support groups", "Medication", "Self-help books", "Other"]
        )
        
        self.assertEqual(single_question.answer_format, "SINGLE")
        self.assertEqual(multiple_question.answer_format, "MULTIPLE")

    def test_str_method(self):
        question = QuestionnaireQuestion.objects.create(
            title="How motivated are you to make positive changes?",
            answer_format="SINGLE",
            available_answers=["Not motivated", "Somewhat motivated", "Very motivated"]
        )
        self.assertEqual(str(question), "How motivated are you to make positive changes?")
