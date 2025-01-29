from django.db import models

class User(models.Model):
    """
    User : A user of Rewire App
        f_name : First name of the user
        l_name : second name of the user
        b_day : Birth date of the user
    """
    f_name = models.CharField(max_length=200)
    l_name = models.CharField(max_length=200)
    b_day = models.DateField()

    def __str__(self):
        return f"User: {self.f_name} {self.l_name}"


