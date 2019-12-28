<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.brewery.title") }}</p>
    </div>
    <div class="card-content">
      <SubNav :tabs="tabs" />
      <div v-if="!loading" class="content">
        <router-view @recipeUpdate="setSelectedRecipe" />
      </div>
      <div v-else class="content">
        <p>Loading ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import SubNav from "@/components/navigation/subNav";
import { fromRecipes } from "@/store/modules/recipes";
import { fromBeers } from "@/store/modules/beers";
import { fromPlayer } from "@/store/modules/player";
import { fromResources } from "@/store/modules/resources";
import { fromBrewery } from "../../store/modules/brewery";

export default {
  name: "Brewery",
  components: { SubNav },
  data() {
    return {
      tabs: [
        {
          to: "/game/brewery/book-of-recipes",
          icon: "book-open",
          name: this.$t("game.brewery.navigation.bookOfRecipes")
        },
        {
          to: "/game/brewery/brew",
          icon: "bolt",
          name: this.$t("game.brewery.navigation.brew")
        }
      ],
      loading: true
    };
  },
  async created() {
    await this.loadRecipes();
    await this.loadBeers();
    this.loading = false;
  },
  methods: {
    ...fromRecipes.mapActions(["loadRecipes"]),
    ...fromBeers.mapActions(["loadBeers"]),
    ...fromPlayer.mapActions(["loadPlayer"]),
    ...fromResources.mapActions(["loadResources"]),
    ...fromBrewery.mapActions(["setSelectedRecipe"])
  }
};
</script>

<style scoped></style>
