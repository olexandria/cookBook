from rest_framework import viewsets
from .models import Recipe, Ingredient, RecipeImage
from .serializers import RecipeSerializer, IngredientSerializer, RecipeImageSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeImageViewSet(viewsets.ModelViewSet):
    queryset = RecipeImage.objects.all()
    serializer_class = RecipeImageSerializer
