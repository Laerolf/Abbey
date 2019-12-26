import { createNamespacedHelpers } from "vuex";
import Vue from "vue";
export const fromResources = createNamespacedHelpers("resources");
const mutations = {};
const actions = {
  loadResources: async function({ commit }) {
    try {
      const response = await this._vm.$axios.get("resources");
      const { resources } = response.data;
      commit("loadResources", resources, { root: true });
    } catch (exception) {
      const { status } = exception.response;
      Vue.notify({
        group: "notifications",
        title: `Error:
${status}`,
        text: "Something went wrong.",
        type: "error"
      });
    }
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
