import Vue from "vue";
import axios from "axios";

export const $axios = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 10000,
  withCredentials: true
});

export const $axiosUnauthenticated = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 10000
});

Vue.prototype.$axios = $axios;
Vue.prototype.$axiosUnauthenticated = $axiosUnauthenticated;
