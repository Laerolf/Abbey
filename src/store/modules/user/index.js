import { createNamespacedHelpers } from "vuex";
import Vue from "vue";

export const fromUser = createNamespacedHelpers("user");

const mutations = {
  setUser(state, data) {
    for (const [key, value] of Object.entries(data)) {
      Vue.set(state, key, value);
    }
  }
};

const actions = {
  async loadUser({ commit }) {
    const { data } = await this._vm.$axios.get("/user");

    commit("setUser", {
      username: data.user.username,
      registrationDate: data.user.registrationDate,
      lastLoginDate: data.user.lastLoginDate
    });
  }
};

export default { namespaced: true, mutations: mutations, actions: actions };
