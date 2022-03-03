from django.urls import path
from . import views

urlpatterns = [
    path("", views.RecipeViewSet.as_view({"get": "list"}), name="recipes"),
    path(
        "<int:pk>/",
        views.RecipeViewSet.as_view({"get": "retrieve"}),
        name="recipe-detail",
    ),
    path(
        "create", views.RecipeViewSet.as_view({"post": "create"}), name="recipe-create"
    ),
    path(
        "<int:pk>/update",
        views.RecipeViewSet.as_view({"get": "retrieve", "put": "update"}),
        name="recipe-update",
    ),
    path(
        "<int:pk>/delete",
        views.RecipeViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
        name="recipe-delete",
    ),
    path(
        "<int:pk>/delete",
        views.RecipeViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
        name="recipe-delete",
    ),
]
