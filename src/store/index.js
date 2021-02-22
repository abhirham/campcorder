import Vue from 'vue'
import Vuex from 'vuex'
import loaderModule from './loaderModule';
import campsModule from './campsModule';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loaderModule,
        campsModule
    },
    state: {},
    mutations: {},
    actions: {},

})