from django.db import models


class Recipe(models.Model):
    name = models.CharField(max_length=70)
    description = models.TextField(blank=True, default="")
    steps = models.TextField(blank=False, default="")
    image = models.URLField(blank=True)

    def __str__(self):
        return self.name


class RecipeImage(models.Model):
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return self.image


class Ingredient(models.Model):
    recipe = models.ForeignKey(
        "Recipe", on_delete=models.CASCADE, related_name="ingredients"
    )
    name = models.CharField(max_length=40)
    amount = models.CharField(max_length=10)

    def __str__(self):
        return self.name
