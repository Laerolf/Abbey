import { createNamespacedHelpers } from "vuex";

export const fromRecipes = createNamespacedHelpers("recipes");
const mutations = {};
const actions = {
  loadRecipes: async function({ commit }) {
    const response = await this._vm.$axios.get("recipes");
    const { recipes } = response.data;
    commit("loadRecipes", recipes, { root: true });
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
