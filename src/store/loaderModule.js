export default {
    namespaced: true,
    state() {
        return {
            loading: [1],
        };
    },
    mutations: {
        setLoading(state, payload) {
            let newArr = state.loading;
            if (payload === true) {
                state.loading = [...newArr, true];
                return;
            }

            state.loading = newArr.slice(1);
        },
    },
    getters: {
        isLoading(state) {
            return state.loading.length > 0;
        },
    },
    actions: {},
};
