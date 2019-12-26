import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromStock = createNamespacedHelpers("stock");

const mutations = {
  increaseStock: function(state, stockIncrease) {
    if (!state[stockIncrease.stockItemName]) {
      Vue.set(state, stockIncrease.stockItemName, {
        resource: stockIncrease.stockItemName,
        quantity: stockIncrease.quantity
      });
    } else {
      Vue.set(
        state[stockIncrease.stockItemName],
        "quantity",
        (state[stockIncrease.stockItemName].quantity += stockIncrease.quantity)
      );
    }
  },
  decreaseStock: function(state, stockDecrease) {
    Vue.set(
      state[stockDecrease.item],
      "quantity",
      (state[stockDecrease.item].quantity -= stockDecrease.quantity)
    );
    if (state[stockDecrease.item].quantity <= 0) {
      delete state[stockDecrease.item];
    }
  }
};
const actions = {
  saveStock: async function({ state }) {
    await this._vm.$axios.put("game/stock", state);
  },
  increaseStock: function({ commit, dispatch }, stockIncrease) {
    commit("increaseStock", stockIncrease);
    dispatch("saveStock");
  },
  decreaseStock: function({ commit, dispatch }, stockDecrease) {
    commit("decreaseStock", stockDecrease);
    dispatch("saveStock");
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
