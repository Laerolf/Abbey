import { createNamespacedHelpers } from "vuex";
export const fromTransmutations = createNamespacedHelpers("transmutations");
const mutations = {};
const actions = {
  loadTransmutations: async function({ commit }) {
    const response = await this._vm.$axios.get("transmutations");
    const { transmutations } = response.data;
    commit("loadTransmutations", transmutations, { root: true });
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
