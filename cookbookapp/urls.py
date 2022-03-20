from django.urls import path
from .views import RecipeList, IngredientList, RecipeDetail, IngredientDetail, api_root

urlpatterns = [
    path("", api_root, name="api"),
    path("recipes/", RecipeList.as_view(), name="recipe-list"),
    path("recipes/<int:pk>/", RecipeDetail.as_view(), name="recipe-detail"),
    path("ingredients/", IngredientList.as_view(), name="ingredient-list"),
    path("ingredients/<int:pk>/", IngredientDetail.as_view(), name="ingredient-detail"),
]
