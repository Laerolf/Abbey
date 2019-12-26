import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
export const fromStory = createNamespacedHelpers("story");
const mutations = {
  setStory: function(state, storyInfo) {
    state = storyInfo;
  },
  setAnswer: function(state, answerInfo) {
    if (!state.storyAnswers) {
      Vue.set(state, "storyAnswers", {});
    }
    Vue.set(state.storyAnswers, answerInfo.question, answerInfo.answer);
  },
  setStoryCompleted: function(state, storyProgress) {
    Vue.set(state, "completeStory", storyProgress);
  }
};
const actions = {
  saveStory: async function(context, storyInfo) {
    await this._vm.$axios.put(`stories`, storyInfo);
  },
  saveAnswer: async function({ commit, dispatch, state, rootState }, answerInfo) {
    await commit("setAnswer", answerInfo);
    dispatch("saveStory", state);
    dispatch("player/savePlayer", rootState.player, { root: true });
  },
  setStoryCompleted: function({ commit, state, dispatch }, storyProgressInfo) {
    commit("setStoryCompleted", storyProgressInfo);
    dispatch("saveStory", state);
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
