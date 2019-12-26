import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromFields = createNamespacedHelpers("fields");
const mutations = {
  buyField: function(state, fieldInfo) {
    const fieldNumber = state.length + 1;
    state.push({
      number: fieldNumber,
      resource: undefined,
      harvestAmount: 10,
      progress: 0,
      fieldValue: { initial: fieldInfo.fieldValue, current: fieldInfo.fieldValue }
    });
  },
  setFieldResource: function(state, installInfo) {
    Vue.set(state[installInfo.fieldNumber - 1], "resource", installInfo.resource);
  },
  depreciateField: function(state, fieldValue) {
    Vue.set(state[fieldValue.fieldNumber - 1].fieldValue, "current", fieldValue.fieldValue);
  },
  saveGrowingField: function(state, growthInfo) {
    Vue.set(state[growthInfo.fieldNumber - 1], "progress", growthInfo.progress);
    Vue.set(state[growthInfo.fieldNumber - 1], "harvestable", growthInfo.harvestable);
  },
  sellField: function(state, fieldInfo) {
    state.splice(fieldInfo.fieldNumber - 1, 1);
  },
  renumberFields: function(state) {
    let fieldNumber = 0;
    state.forEach(field => {
      Vue.set(state[field], "number", fieldNumber++);
    });
  }
};
const actions = {
  buyField: function({ commit, dispatch }, fieldInfo) {
    commit("buyField", fieldInfo);
    dispatch("saveGame", {}, { root: true });
  },
  setFieldResource: function({ commit, dispatch }, installInfo) {
    commit("setFieldResource", installInfo);
    dispatch("saveGame", {}, { root: true });
  },
  saveGrowingField: function({ commit, dispatch }, growthInfo) {
    commit("saveGrowingField", growthInfo);
    dispatch("saveGame", {}, { root: true });
  },
  depreciateField: function({ commit, dispatch }, fieldValue) {
    commit("depreciateField", fieldValue);
    dispatch("saveGame", {}, { root: true });
  },
  sellField: function({ commit, dispatch }, fieldInfo) {
    commit("sellField", fieldInfo);
    dispatch("saveGame", {}, { root: true });
  },
  renumberFields: function({ commit, dispatch }) {
    commit("renumberFields");
    dispatch("saveGame", {}, { root: true });
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
