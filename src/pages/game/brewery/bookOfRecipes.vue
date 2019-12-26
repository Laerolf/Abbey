<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Book of Recipes</p>
    </div>
    <div class="card-content">
      <div class="content">
        <p v-if="hasSelectedRecipe">
          Currently your brewery is bound to make "{{ selectedBeer.name }}".
        </p>
        <p v-else>Your brewery doesn't have a recipe to brew.<br />Select one to start brewing.</p>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Recipes</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="selectedRecipeId">
                    <option value="undefined">-- Select a recipe --</option>
                    <option v-for="recipe in recipes" :key="recipe._id" :value="recipe._id">
                      {{ recipe.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="hasSelectedRecipe" class="card">
          <div class="card-header">
            <p class="card-header-title">{{ selectedRecipe.name }}</p>
          </div>

          <div class="card-content">
            <div class="content">
              <h5 class="title is-5">Description</h5>

              <p>{{ selectedBeer.description }}</p>

              <p>
                Discovered by {{ selectedBeer.discoverer }},
                {{ selectedBeer.discoverDate | formatBeerDiscoveryDate }}.
              </p>

              <h5 class="title is-5">Ingredients</h5>

              <ul>
                <li
                  v-for="(ingredientAmt, ingredientName) in selectedRecipe.ingredients"
                  :key="ingredientName"
                >
                  {{ ingredientAmt }} of {{ ingredientName }}
                </li>
              </ul>

              <h5 class="title is-5">Details</h5>

              <ul>
                <li>Category: {{ selectedBeer.category }}</li>
                <li>
                  Alcohol percentage:
                  {{ selectedBeer.alcoholLevel | percentize }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromBrewery } from "@/store/modules/brewery";
import { fromRecipes } from "@/store/modules/recipes";

export default {
  name: "BookOfRecipes",
  computed: {
    ...fromBrewery.mapState(["selectedRecipe", "selectedBeer"]),
    ...fromRecipes.mapState({
      recipes: state => state
    }),
    selectedRecipeId: {
      get() {
        return this.hasSelectedRecipe ? this.selectedRecipe._id : undefined;
      },
      set(newRecipeId) {
        this.$emit(
          "recipeUpdate",
          this.recipes.find(recipe => recipe._id === newRecipeId)
        );
      }
    },
    hasSelectedRecipe() {
      return !!this.selectedRecipe;
    }
  }
};
</script>

<style scoped>
#abbey-brewery-bookOfRecipes .card-body ul {
  list-style: disc;
}
</style>
