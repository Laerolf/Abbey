import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromBreweryProcessors = createNamespacedHelpers("breweryProcessors");
const mutations = {
  saveProcessingBreweryProcessor: function(state, data) {
    const { index, progress, gainable } = data;
    Vue.set(state[index], "progress", progress);
    Vue.set(state[index], "gainable", gainable);
  },
  setBreweryProcessorOutput: function(state, data) {
    const { beerResourceId, index } = data;
    state[index].output.push({ resource: beerResourceId, quantity: 1 });
  }
};
const actions = {
  saveProcessingBreweryProcessor: function({ commit, state }, data) {
    const { id } = data;
    data.index = state.findIndex(breweryProcessor => breweryProcessor._id === id);
    delete data.id;
    commit("saveProcessingBreweryProcessor", data);
  },
  loadBreweryProcessors: async function({ commit }) {
    const response = await this._vm.$axios.get("breweryprocessors");
    const { breweryProcessors } = response.data;
    commit("loadBreweryProcessors", breweryProcessors, { root: true });
  },
  setFermentationTankOutput({ commit, state, rootState }, data) {
    const { beer } = data;

    data.beerResourceId = rootState.resources.find(
      resource => beer.mapName === resource.mapName
    )._id;
    data.index = state.findIndex(breweryProcessor => breweryProcessor.name === "Fermentation tank");

    delete data.beer;
    commit("setBreweryProcessorOutput", data);
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
