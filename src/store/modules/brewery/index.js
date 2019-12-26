import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromBrewery = createNamespacedHelpers("brewery");
const mutations = {
  setSelectedRecipe: function(state, recipe) {
    Vue.set(state, "selectedRecipe", recipe);
  },
  setSelectedBeer: function(state, beer) {
    Vue.set(state, "selectedBeer", beer);
  }
};
const actions = {
  setSelectedRecipe: function({ commit, dispatch, rootState }, recipe) {
    const { resource: beerId } = recipe;

    const selectedBeer = rootState.beers.find(beer => beer._id === beerId);
    commit("setSelectedRecipe", recipe);
    dispatch("setSelectedBeer", selectedBeer);
  },
  setSelectedBeer: function({ commit }, beer) {
    commit("setSelectedBeer", beer);
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
