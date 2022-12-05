from django.db import models

class leaderboard(models.Model):
    name = models.TextField(max_length=20)
    score = models.DecimalField(decimal_places=0, max_digits=7)
