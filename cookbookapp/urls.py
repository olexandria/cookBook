from rest_framework import routers
from .views import RecipeViewSet, IngredientViewSet

router = routers.DefaultRouter()
router.register(r"recipes", RecipeViewSet)
router.register(r"ingredients", IngredientViewSet)

urlpatterns = router.urls
