<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Brew</p>
    </div>
    <div class="card-content">
      <div v-if="!loading" class="content">
        <p v-if="brewMonks < 1">There are {{ brewMonks }} monks working here.<br /></p>

        <p v-if="brewMonks >= 1" class="card-text">
          There are {{ brewMonks }} monks working here.<br />
          This results in a {{ monkBonus | percentize }} bonus.
        </p>

        <div v-if="selectedRecipe">
          <BreweryProcessor
            v-for="breweryProcessor in breweryProcessors"
            :key="breweryProcessor.name"
            :brewery-processor="breweryProcessor"
          />
        </div>
        <p v-if="!hasSelectedRecipe">
          Select a recipe in the
          <router-link to="/game/brewery/book-of-recipes" tag="a">Book of Recipes</router-link>
          , your monks don't know what to brew yet!
        </p>

        <p v-if="!breweryProcessors">You don't have any equipment yet!</p>
      </div>
      <div v-else class="content">
        Loading ...
      </div>
    </div>
  </div>
</template>

<script>
import BreweryProcessor from "@/components/brewery/breweryProcessor";
import { fromBrewery } from "@/store/modules/brewery";
import { fromAbbey } from "@/store/modules/abbey";
import { fromRecipes } from "@/store/modules/recipes";
import { fromBreweryProcessors } from "@/store/modules/breweryProcessors";

export default {
  name: "Brew",
  components: { BreweryProcessor },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...fromBrewery.mapState(["selectedRecipe"]),
    ...fromAbbey.mapState(["departments"]),
    ...fromRecipes.mapState({ recipes: state => state }),
    ...fromBreweryProcessors.mapState({ breweryProcessors: state => state }),
    brewMonks: function() {
      return this.departments["brewery"].monks;
    },
    monkBonus: function() {
      return (this.brewMonks / 100) * 10;
    },
    hasSelectedRecipe() {
      return !!this.selectedRecipe;
    }
  },
  async created() {
    await this.loadBreweryProcessors();
    this.loading = false;
  },
  methods: {
    ...fromBreweryProcessors.mapActions(["loadBreweryProcessors"])
  }
};
</script>

<style scoped></style>
