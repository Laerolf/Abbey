import { createNamespacedHelpers } from "vuex";
import i18n from "@/plugins/i18n";
export const fromTranslations = createNamespacedHelpers("translations");
const mutations = {
  setLanguage: async function(state, translationInfo) {
    const { language, content } = translationInfo;
    state[language] = { ...content };
  }
};
const actions = {
  loadLanguage: async function({ commit, state, dispatch }, language) {
    if (!state[language]) {
      const response = await this._vm.$axiosUnauthenticated.get(`/translation/${language}`);
      const { translation } = response.data;
      await commit("setLanguage", translation);
      dispatch("setLanguage", language);
    }
  },
  setLanguage({ state }, language) {
    i18n.setLocaleMessage(language, state[language]);
  }
};
export default { namespaced: true, mutations: mutations, actions: actions };
