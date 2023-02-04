from django.db import models

class Facebook(models.Model):
    responseTime=models.CharField(max_length=100,null=True)

class Google(models.Model):
    responseTime=models.CharField(max_length=100,null=True)

class Twitter(models.Model):
    responseTime=models.CharField(max_length=100,null=True)

class Cnet(models.Model):
    responseTime=models.CharField(max_length=100,null=True)

class Amazon(models.Model):
    responseTime=models.CharField(max_length=100,null=True)
class AddWebsite(models.Model):
    responseTime=models.CharField(max_length=100,null=True)