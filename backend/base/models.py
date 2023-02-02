from django.db import models

class Facebook(models.Model):
    responseTime=models.CharField(max_length=100,null=True)
