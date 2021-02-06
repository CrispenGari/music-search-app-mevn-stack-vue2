import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import { Home, History } from "./Screens";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/history", component: History, name: "History" },
];

const router = new VueRouter({
  routes: routes,
});

export default router;
