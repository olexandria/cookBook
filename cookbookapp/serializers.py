from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers
from .models import Recipe, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ("id", "name", "amount")


class RecipeSerializer(WritableNestedModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ("id", "name", "description", "steps", "image", "ingredients")

    # def update(self, instance, validated_data):
    #     ingredients_data = validated_data.pop("ingredients")
    #     ingredients = (instance.ingredients).all()
    #     ingredients = list(ingredients)
    #     instance.name = validated_data.get("name", instance.name)
    #     instance.description = validated_data.get("description", instance.description)
    #     instance.steps = validated_data.get("steps", instance.steps)
    #     instance.image = validated_data.get("image", instance.image)
    #     instance.save()
    #
    #     for ingredient_data in ingredients_data:
    #         ingredient = ingredients.pop(0)
    #         ingredient.name = ingredient_data.get("name", ingredient.name)
    #         ingredient.amount = ingredient_data.get("amount", ingredient.amount)
    #         ingredient.save()
    #     return instance
