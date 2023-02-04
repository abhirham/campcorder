import Vue from "vue";
import Vuex from "vuex";
import userModule from "./userModule";
import campModule from "./campModule";
import notificationModule from "./notificationModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userModule,
        campModule,
        notificationModule
    },
    state: {},
    mutations: {},
    actions: {}
});
