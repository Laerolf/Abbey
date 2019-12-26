import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromAbbey = createNamespacedHelpers("abbey");
const mutations = {
  setDepartment: function(state, data) {
    const { department, value } = data;
    Vue.set(state.departments[department], "monks", value);
  },
  setAssignedFacilityMonks: function(state, data) {
    const { facility, quantity } = data;
    Vue.set(state.departments.facilities.assignedMonks, facility, quantity);
  },
  setCurrentChore(state, data) {
    Vue.set(state.schedule, "currentChore", data);
  }
};
const actions = {
  saveAbbey: async function({ state }) {
    await this._vm.$axios.put("game/abbey", state);
  },
  setDepartment({ commit, dispatch }, data) {
    commit("setDepartment", data);
    dispatch("saveAbbey");
  },
  setAssignedFacilityMonks({ commit, dispatch }, data) {
    commit("setAssignedFacilityMonks", data);
    dispatch("saveAbbey");
  },
  setCurrentChore({ commit, dispatch }, data) {
    commit("setCurrentChore", data);
    dispatch("saveAbbey");
  }
};

const getters = {
  getChores(state) {
    const { schedule } = state;
    if (schedule) {
      return Object.values(state.schedule.chores).sort((choreA, choreB) =>
        choreA.time < choreB.time ? -1 : 1
      );
    }
    return [];
  }
};
export default { namespaced: true, mutations: mutations, actions: actions, getters: getters };
