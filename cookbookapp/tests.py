from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient


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
        # a = Recipe.objects.create(name='Sample recipe', description='Sample description')
        # recipe = Recipe.objects.get(name='Sample recipe')
        # self.assertEqual(Recipe.objects.count(), 1)
        # self.assertEqual(recipe.description, 'Sample description')

        res = self.client.post(RECIPES_URL, payload, format="json")
        print(res.json())
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
