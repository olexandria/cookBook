import factory
from faker import Faker
from faker_food import FoodProvider
from cookbookapp.models import Recipe, Ingredient

faker = Faker()
faker.add_provider(FoodProvider)


class IngredientFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Ingredient

    name = faker.ingredient()
    amount = faker.measurement()


class RecipeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Recipe

    name = faker.dish()
    description = faker.dish_description()
    steps = [faker.sentence() for _ in range(3)]
    ingredients = factory.RelatedFactoryList(
        IngredientFactory, factory_related_name="recipe", size=2
    )
