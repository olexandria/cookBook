from django.urls import path
from . import views

urlpatterns = [
    path("", views.apiOverview, name="api"),
    path(
        "recipes/",
        views.RecipeViewSet.as_view({"get": "list", "post": "create"}),
        name="recipes",
    ),
    path(
        "recipes/<int:pk>/",
        views.RecipeViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
        name="recipe-detail",
    ),
    path(
        "create/",
        views.RecipeViewSet.as_view({"get": "retrieve", "post": "create"}),
        name="recipe-create",
    ),
    path(
        "recipes/<int:pk>/update/",
        views.RecipeViewSet.as_view({"get": "retrieve", "put": "update"}),
        name="recipe-update",
    ),
    path(
        "recipes/<int:pk>/delete/",
        views.RecipeViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
        name="recipe-delete",
    ),
]
