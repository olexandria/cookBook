from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import Recipe, Ingredient
from .serializers import RecipeSerializer, IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by("name")
    serializer_class = RecipeSerializer

    def get(request, pk=None):
        if pk:
            recipe = get_object_or_404(Recipe.objects.all(), pk=pk)
            serializer = RecipeSerializer(recipe)
            return Response({"recipe": serializer.data})
        recipe = Recipe.objects.all()
        serializer = RecipeSerializer(recipe, many=True)
        return Response({"recipes": serializer.data})

    def post(self, request):
        recipe = request.data.get("recipe")
        serializer = RecipeSerializer(data=recipe)
        if serializer.is_valid(raise_exception=True):
            recipe_saved = serializer.save()
        return Response(
            {"success": "Recipe '{}' created successfully".format(recipe_saved.title)}
        )

    def put(self, request, pk):
        saved_recipe = get_object_or_404(Recipe.objects.all(), pk=pk)
        data = request.data.get("recipe")
        serializer = RecipeSerializer(instance=saved_recipe, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            recipe_saved = serializer.save()
        return Response(
            {"success": "Recipe '{}' updated successfully".format(recipe_saved.title)}
        )

    def delete(self, request, pk):
        recipe = get_object_or_404(Recipe.objects.all(), pk=pk)
        recipe.delete()
        return Response(
            {"message": "Recipe with id `{}` has been deleted.".format(pk)}, status=204
        )


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by("name")
    serializer_class = IngredientSerializer
