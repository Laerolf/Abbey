import Vue from "vue";
import Vuex from "vuex";
import abbey from "./modules/abbey";
import brewery from "./modules/brewery";
import breweryProcessors from "./modules/breweryProcessors";
import facilities from "./modules/facilities";
import processors from "./modules/processors";
import fields from "./modules/fields";
import player from "./modules/player";
import stock from "./modules/stock";
import story from "./modules/story";
import user from "./modules/user";
import workbench from "./modules/workbench";
import translations from "./modules/translations";
import resources from "./modules/resources";
import vendors from "./modules/vendors";
import recipes from "./modules/recipes";
import beers from "./modules/beers";
import transmutations from "./modules/transmutations";
import { mutations, actions } from "./modules/load";
Vue.use(Vuex);

export const fromRoot = Vuex.createNamespacedHelpers("");

export default new Vuex.Store({
  modules: {
    abbey: abbey,
    brewery: brewery,
    breweryProcessors: breweryProcessors,
    facilities: facilities,
    processors: processors,
    fields: fields,
    player: player,
    stock: stock,
    resources: resources,
    story: story,
    user: user,
    vendors: vendors,
    workbench: workbench,
    translations: translations,
    recipes: recipes,
    beers: beers,
    transmutations: transmutations
  },
  mutations: { ...mutations },
  actions: {
    ...actions,
    async loadGame({ commit }) {
      try {
        const response = await this._vm.$axios.get("game");
        const { game } = response.data;
        commit("loadGame", game);
      } catch (exception) {
        // const { status } = exception.response;
        console.warn(exception.response);
        Vue.notify({
          group: "notifications",
          title: "Error",
          text: "Something went wrong.",
          type: "error"
        });
        // router.push({ name: "Login" });
      }
    },
    async saveGame({ state }) {
      await this._vm.$axios.put("game", state);
    }
  }
});
