import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromFacilities = createNamespacedHelpers("facilities");
const mutations = {
  updateFacility: function(state, data) {
    const { index, key, value } = data;
    Vue.set(state[index], key, value);
  }
};
const actions = {
  saveFacility: async function(context, facilityData) {
    await this._vm.$axios.put("game/facilities", facilityData);
  },
  loadFacilities: async function({ commit }) {
    const response = await this._vm.$axios.get("facilities");
    const { facilities } = response.data;
    commit("loadFacilities", facilities, { root: true });
  },
  updateFacility: async function({ commit, state }, data) {
    const { facilityId, value, key } = data;
    const facilityIndex = state.findIndex(facility => facility._id === facilityId);
    await commit("updateFacility", { index: facilityIndex, key: key, value: value });
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
