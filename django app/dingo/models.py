from django.db import models

# Create your models here.

class Food(models.Model):
    naziv = models.CharField(max_length=45)
    slika = models.CharField(max_length=200)
    komentar = models.CharField(max_length=200)
    cena = models.IntegerField()
    ocena = models.IntegerField()


class Location(models.Model):
    naziv = models.CharField(max_length=45)
    slika = models.CharField(max_length=200)
    adresa = models.CharField(max_length=45)
    telefon = models.CharField(max_length=45)
