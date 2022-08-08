from rest_framework import routers
from .views import RecipeViewSet, IngredientViewSet, RecipeImageViewSet

router = routers.DefaultRouter()
router.register(r"recipes", RecipeViewSet)
router.register(r"ingredients", IngredientViewSet)
router.register(r"images", RecipeImageViewSet)

urlpatterns = router.urls
