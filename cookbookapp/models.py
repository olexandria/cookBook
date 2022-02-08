from django.db import models


class Recipe(models.Model):
    name = models.CharField(max_length=70)
    description = models.TextField(blank=True, default="")
    steps = models.TextField(blank=False, default="")
    image = models.ImageField(blank=True, null=True, upload_to="images/")

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    recipe = models.ForeignKey(
        "Recipe", on_delete=models.CASCADE, related_name="ingredients"
    )
    name = models.CharField(max_length=40)
    amount = models.CharField(max_length=10)

    def __str__(self):
        return self.name
