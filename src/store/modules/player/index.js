import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromPlayer = createNamespacedHelpers("player");
const mutations = {
  increaseGoldenCoins: function(state, increasement) {
    Vue.set(state, "goldenCoins", (state.goldenCoins += increasement.amount));
  },
  decreaseGoldenCoins: function(state, decreasement) {
    Vue.set(state, "goldenCoins", (state.goldenCoins -= decreasement.amount));
  },
  increaseReputation: function(state, increasement) {
    Vue.set(state, "reputation", (state.reputation += increasement.amount));
  },
  decreaseReputation: function(state, decreasement) {
    Vue.set(state, "reputation", (state.reputation -= decreasement.amount));
  },
  setPlayerCounter: function(state, countInfo) {
    Vue.set(state.counter, countInfo.type, countInfo.quantity);
  },
  setPlayerName: function(state, playerName) {
    Vue.set(state, "name", playerName);
  }
};
const actions = {
  loadPlayer: async function({ commit }) {
    const response = await this._vm.$axios.get("player");
    const { player } = response.data;
    commit("loadPlayer", player, { root: true });
  },
  savePlayer: async function({ state }) {
    await this._vm.$axios.put("player", state);
  },
  increaseGoldenCoins: function({ commit, dispatch }, increasement) {
    commit("increaseGoldenCoins", increasement);
    dispatch("savePlayer");
  },
  decreaseGoldenCoins: function({ commit, dispatch }, decreasement) {
    commit("decreaseGoldenCoins", decreasement);
    dispatch("savePlayer");
  },
  increaseReputation: function({ commit, dispatch }, increasement) {
    commit("increaseReputation", increasement);
    dispatch("savePlayer");
  },
  decreaseReputation: function({ commit, dispatch }, decreasement) {
    commit("decreaseReputation", decreasement);
    dispatch("savePlayer");
  },
  setPlayerCounter: function({ commit, dispatch }, countInfo) {
    commit("setPlayerCounter", countInfo);
    dispatch("savePlayer");
  },
  setPlayerName: function({ commit, dispatch }, playerName) {
    commit("setPlayerName", playerName);
    dispatch("savePlayer");
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
