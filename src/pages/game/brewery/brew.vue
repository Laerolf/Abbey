<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.brewery.brew.title") }}</p>
    </div>
    <div class="card-content">
      <div v-if="!loading" class="content">
        <p v-if="brewMonks < 1">{{ $t("game.brewery.brew.noBrewingMonksMessage") }}</p>

        <p
          v-if="brewMonks >= 1"
          class="card-text"
          v-html="
            $t('game.brewery.brew.brewingMonksMessage', {
              monkAmount: brewMonks,
              monkBonus: monkBonus | percentize
            })
          "
        />

        <div v-if="selectedRecipe">
          <BreweryProcessor
            v-for="breweryProcessor in breweryProcessors"
            :key="breweryProcessor.name"
            :brewery-processor="breweryProcessor"
          />
        </div>
        <p v-if="!hasSelectedRecipe" v-html="$t('game.brewery.brew.noSelectedRecipeMessage')" />
        <p v-if="!breweryProcessors" v-html="$t('game.brewery.brew.noEquipmentMessage')" />
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
  props: {
    loading: { type: Boolean, default: false }
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
  }
};
</script>

<style scoped></style>
