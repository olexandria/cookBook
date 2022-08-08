from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers
from .models import Recipe, Ingredient, RecipeImage


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ("name", "amount")


class RecipeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeImage
        fields = "__all__"


class RecipeSerializer(WritableNestedModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ("id", "name", "description", "steps", "image", "ingredients")
