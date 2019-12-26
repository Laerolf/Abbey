import { createNamespacedHelpers } from "vuex";
export const fromBeers = createNamespacedHelpers("beers");
const mutations = {};
const actions = {
  loadBeers: async function({ commit }) {
    const response = await this._vm.$axios.get("beers");
    const { beers } = response.data;
    commit("loadBeers", beers, { root: true });
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
