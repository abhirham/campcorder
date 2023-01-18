import Vue from 'vue'
import Vuex from 'vuex'
import loaderModule from './loaderModule';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loaderModule,
    },
    state: {},
    mutations: {},
    actions: {},

})