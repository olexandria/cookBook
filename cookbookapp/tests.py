import tempfile

from PIL import Image
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from cookbookapp.models import Recipe, Ingredient
from cookbookapp.serializers import RecipeSerializer

RECIPES_URL = reverse("recipe-list")


def detail_url(recipe_id):
    return reverse("recipe-detail", args=[recipe_id])


class RecipeApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_basic_recipe(self):
        payload = {
            "name": "Sample recipe",
            "description": "Sample description",
            "steps": "1. Cook, 2. Eat",
            "ingredients": [],
        }
        res = self.client.post(RECIPES_URL, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_view_recipe_detail(self):
        recipe = Recipe.objects.create(
            name="Sample recipe",
            description="Sample description",
            steps="1. Cook, 2. Eat",
        )

        url = detail_url(recipe.id)
        res = self.client.get(url)

        serializer = RecipeSerializer(recipe)
        self.assertEqual(res.data, serializer.data)

    def test_create_recipe_with_ingredient(self):
        payload = {
            "name": "Sample recipe",
            "description": "Sample description",
            "steps": "1. Cook, 2. Eat",
            "ingredients": [{"name": "jfskj", "amount": "1000 kg"}],
        }

        res = self.client.post(RECIPES_URL, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        recipe = Recipe.objects.get(id=res.data["id"])
        ingredients = recipe.ingredients.all()
        self.assertEqual(ingredients.count(), 1)
        self.assertEqual(Ingredient.objects.count(), 1)

    def test_partial_update_recipe(self):
        recipe = Recipe.objects.create(
            name="Sample recipe",
            description="Sample description",
            steps="1. Cook, 2. Eat",
        )

        payload = {
            "description": "Edited description",
        }

        url = detail_url(recipe.id)
        self.client.patch(url, payload)

        recipe.refresh_from_db()
        self.assertEqual(recipe.description, payload["description"])

    def test_full_update_recipe(self):
        recipe = Recipe.objects.create(
            name="Sample recipe",
            description="Sample description",
            steps="1. Cook, 2. Eat",
        )

        payload = {
            "name": "Edited recipe",
            "description": "Edited description",
            "steps": "Edited steps",
            "ingredients": [],
        }

        url = detail_url(recipe.id)
        self.client.put(url, payload, format="json")

        recipe.refresh_from_db()
        self.assertEqual(recipe.name, payload["name"])
        self.assertEqual(recipe.description, payload["description"])
        self.assertEqual(recipe.steps, payload["steps"])

    def test_delete_recipe(self):
        recipe = Recipe.objects.create(
            name="Sample recipe",
            description="Sample description",
            steps="1. Cook, 2. Eat",
        )

        url = detail_url(recipe.id)
        res = self.client.delete(url)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        url = detail_url(recipe.id)
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_upload_image_to_recipe(self):
        recipe = Recipe.objects.create(
            name="Sample recipe",
            description="Sample description",
            steps="1. Cook, 2. Eat",
        )

        url = detail_url(recipe.id)
        with tempfile.NamedTemporaryFile(suffix=".jpg") as ntf:
            img = Image.new("RGB", (10, 10))
            img.save(ntf, format="JPEG")
            ntf.seek(0)
            res = self.client.patch(url, {"image": ntf}, format="multipart")

        recipe.refresh_from_db()
        print(recipe.image)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
