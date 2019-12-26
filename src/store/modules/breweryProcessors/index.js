import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromBreweryProcessors = createNamespacedHelpers("breweryProcessors");
const mutations = {
  saveProcessingBreweryProcessor: function(state, processingInfo) {
    Vue.set(state[processingInfo.name.toLowerCase()], "progress", processingInfo.progress);
    Vue.set(state[processingInfo.name.toLowerCase()], "gainable", processingInfo.gainable);
  }
};
const actions = {
  saveProcessingBreweryProcessor: function(context, processingInfo) {
    context.commit("saveProcessingBreweryProcessor", processingInfo);
  },
  loadBreweryProcessors: async function({ commit }) {
    const response = await this._vm.$axios.get("breweryprocessors");
    const { breweryProcessors } = response.data;
    commit("loadBreweryProcessors", breweryProcessors, { root: true });
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
