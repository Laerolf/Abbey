import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromProcessors = createNamespacedHelpers("processors");
const mutations = {
  setProcessorSelectedInput: function(state, data) {
    const { index, key, value } = data;
    Vue.set(state[index].selectedInput, key, value);
  }
};
const actions = {
  loadProcessors: async function({ commit }) {
    const response = await this._vm.$axios.get("processors");
    const { processors } = response.data;
    commit("loadProcessors", processors, { root: true });
  },
  setProcessorSelectedInput: function({ commit, state }, data) {
    const { processorId } = data;
    data.index = state.findIndex(processor => processor._id === processorId);
    delete data.processorId;
    commit("setProcessorSelectedInput", data);
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
