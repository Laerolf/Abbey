<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.brewery.bookOfRecipes.title") }}</p>
    </div>
    <div class="card-content">
      <div class="content">
        <p v-if="hasSelectedRecipe">
          {{
            $t("game.brewery.bookOfRecipes.selectedRecipeMessage", {
              selectedRecipe: selectedBeer.name
            })
          }}
        </p>
        <p v-else v-html="$t('game.brewery.bookOfRecipes.noSelectedRecipeMessage')" />

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">{{ $t("game.brewery.bookOfRecipes.recipes.title") }}</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="select">
                  <select v-model="selectedRecipeId">
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
              <h5 class="title is-5">{{ $t("game.brewery.bookOfRecipes.recipe.description") }}</h5>

              <p>{{ selectedBeer.description }}</p>

              <p
                v-html="
                  $t('game.brewery.bookOfRecipes.recipe.discoveredMessage', {
                    discoverer: selectedBeer.discoverer,
                    discoverDate: selectedBeer.discoverDate | formatBeerDiscoveryDate
                  })
                "
              />

              <h5 class="title is-5">{{ $t("game.brewery.bookOfRecipes.recipe.ingredients") }}</h5>

              <ul>
                <li
                  v-for="(ingredientAmt, ingredientName) in selectedRecipe.ingredients"
                  :key="ingredientName"
                >
                  {{ ingredientAmt }} of {{ ingredientName }}
                </li>
              </ul>

              <h5 class="title is-5">{{ $t("game.brewery.bookOfRecipes.recipe.details") }}</h5>

              <ul>
                <li>
                  {{
                    $t("game.brewery.bookOfRecipes.recipe.category", {
                      category: selectedBeer.category
                    })
                  }}
                </li>
                <li
                  v-html="
                    $t('game.brewery.bookOfRecipes.recipe.alcoholLevel', {
                      alcoholLevel: selectedBeer.alcoholLevel | percentize
                    })
                  "
                />
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
