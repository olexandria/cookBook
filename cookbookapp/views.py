from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import Recipe, Ingredient
from .serializers import RecipeSerializer, IngredientSerializer


@api_view(["GET"])
def apiOverview(request):
    api_urls = {
        "Recipes": "/recipes/",
        "Recipe Detail": "recipes/<int:pk>/",
        "Create": "/create/",
        "Update": "recipes/<int:pk>/update/",
        "Delete": "recipes/<int:pk>/delete/",
    }
    return Response(api_urls)


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def list(self, request):
        queryset = Recipe.objects.all()
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Recipe.objects.all()
        recipe = get_object_or_404(queryset, pk=pk)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def create(self, request):
        serializer = RecipeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def update(self, request, pk=None):
        recipes = Recipe.objects.get(id=pk)
        serializer = RecipeSerializer(instance=recipes, data=request.data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        recipe = Recipe.objects.get(id=pk)
        recipe.delete()
        return Response("Recipe successfully delete!")


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by("name")
    serializer_class = IngredientSerializer
