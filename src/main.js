import Vue from "vue";
import App from "@/App";
import router from "@/router";
import store from "@/store";
import "bulma/bulma.sass";
import "@/assets/sass/main.scss";
import "@/plugins";
import i18n from "@/plugins/i18n";
import "@/filters";

Vue.config.productionTip = false;

new Vue({ router, store, i18n, render: h => h(App) }).$mount("#abbey");
