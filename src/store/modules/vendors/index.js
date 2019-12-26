import { createNamespacedHelpers } from "vuex";
export const fromVendors = createNamespacedHelpers("vendors");

const mutations = {};

const actions = {
  loadVendors: async function({ commit }) {
    try {
      const response = await this._vm.$axios.get("vendors");
      const { vendors } = response.data;
      commit("loadVendors", vendors, { root: true });
    } catch (exception) {
      const { status } = exception.response;
      this.$notify({
        group: "notifications",
        title: `Error: ${status}`,
        text: "Something went wrong.",
        type: "error"
      });
    }
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
