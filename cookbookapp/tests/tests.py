import tempfile

from PIL import Image
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from cookbookapp.models import Recipe, Ingredient
from cookbookapp.serializers import RecipeSerializer
from cookbookapp.tests.factories import RecipeFactory


class RecipeApiTestsWithFactories(TestCase):
    def test_create_basic_recipe(self):
        recipe = RecipeFactory()

        res = self.client.get(reverse("recipe-list"))
        serializer = RecipeSerializer(recipe)
        print(serializer.data)

        self.assertEqual(200, res.status_code)
        self.assertContains(res, recipe.name)


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

        res = self.client.post(reverse("recipe-list"), payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_view_recipe_detail(self):
        recipe = RecipeFactory()

        res = self.client.get(reverse("recipe-detail", args=[recipe.id]))

        serializer = RecipeSerializer(recipe)
        self.assertEqual(res.data, serializer.data)

    def test_create_recipe_with_ingredient(self):
        payload = {
            "name": "Sample recipe",
            "description": "Sample description",
            "steps": "1. Cook, 2. Eat",
            "ingredients": [{"name": "jfskj", "amount": "1000 kg"}],
        }

        res = self.client.post(reverse("recipe-list"), payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        recipe = Recipe.objects.get(id=res.data["id"])
        ingredients = recipe.ingredients.all()
        self.assertEqual(ingredients.count(), 1)
        self.assertEqual(Ingredient.objects.count(), 1)

    def test_partial_update_recipe(self):
        recipe = RecipeFactory()
        recipe_name = recipe.name

        payload = {
            "description": "Edited description",
        }

        self.client.patch(reverse("recipe-detail", args=[recipe.id]), payload)
        recipe.refresh_from_db()

        self.assertEqual(recipe.description, payload["description"])
        self.assertEqual(recipe_name, recipe.name)

    def test_full_update_recipe(self):
        recipe = RecipeFactory()

        payload = {
            "name": "Edited recipe",
            "description": "Edited description",
            "steps": "Edited steps",
            "ingredients": [],
        }

        self.client.put(
            reverse("recipe-detail", args=[recipe.id]), payload, format="json"
        )
        recipe.refresh_from_db()

        self.assertEqual(recipe.name, payload["name"])
        self.assertEqual(recipe.description, payload["description"])
        self.assertEqual(recipe.steps, payload["steps"])
        self.assertEqual(recipe.ingredients.count(), 0)

    def test_delete_recipe(self):
        recipe = Recipe.objects.create(
            name="Sample recipe",
            description="Sample description",
            steps="1. Cook, 2. Eat",
        )

        res = self.client.delete(reverse("recipe-detail", args=[recipe.id]))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        res = self.client.get(reverse("recipe-detail", args=[recipe.id]))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_upload_image_to_recipe(self):
        recipe = Recipe.objects.create(
            name="Sample recipe",
            description="Sample description",
            steps="1. Cook, 2. Eat",
        )

        with tempfile.NamedTemporaryFile(suffix=".jpg") as ntf:
            img = Image.new("RGB", (10, 10))
            img.save(ntf, format="JPEG")
            ntf.seek(0)
            res = self.client.patch(
                reverse("recipe-detail", args=[recipe.id]),
                {"image": ntf},
                format="multipart",
            )

        recipe.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
