import Vue from "vue";
import Vuex from "vuex";
import loaderModule from "./loaderModule";
import userModule from "./userModule";
import campModule from "./campModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        loaderModule,
        userModule,
        campModule
    },
    state: {},
    mutations: {},
    actions: {}
});
