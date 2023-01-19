import Vue from "vue";
import Vuex from "vuex";
import loaderModule from "./loaderModule";
import userModule from "./userModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        loaderModule,
        userModule,
    },
    state: {},
    mutations: {},
    actions: {},
});
