import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromWorkbench = createNamespacedHelpers("workbench");
const mutations = {
  addWorkbenchSlot: function(state, workbenchSlot) {
    state.slots.push(workbenchSlot);
  },
  updateWorkbenchSlot: function(state, workbenSlotInfo) {
    const { index, slot } = workbenSlotInfo;
    Vue.set(state.slots, index, slot);
  },
  deleteWorkbenchSlot: function(state, workbenchSlotsInfo) {
    const { slotIndex } = workbenchSlotsInfo;
    Vue.delete(state.slots, slotIndex);
  }
};
const actions = {
  addWorkbenchSlot: function({ commit, state }) {
    commit("addWorkbenchSlot", { resource: undefined, amount: 0, number: state.slots.length + 1 });
  },
  updateWorkbenchSlot: function({ commit, state }, workbenchSlotInfo) {
    const { number } = workbenchSlotInfo.slot;
    commit("updateWorkbenchSlot", {
      index: state.slots.findIndex(slot => slot.number === number),
      ...workbenchSlotInfo
    });
  },
  deleteWorkbenchSlot: function({ commit }, workbenchSlotInfo) {
    commit("deleteWorkbenchSlot", workbenchSlotInfo);
  }
};

export default { namespaced: true, mutations: mutations, actions: actions };
