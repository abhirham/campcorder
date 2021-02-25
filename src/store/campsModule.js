export default {
    name: 'campsModule',
    namespaced: true,
    state() {
        return {
            camps: {
                1: {
                    src: "https://images.unsplash.com/photo-1612832021026-375ae70f24bf?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1041&q=80",
                    id: 1,
                    title: 'My Camp ground',
                    createdBy: 'abhirham',
                    price: 30,
                    currency: '$',
                    rating: 3.5,
                    amenities: ['Wifi'],
                    contact: '12345678',
                    description: 'adasdasdasd',
                    createdAt: 'August 6 2018',
                    comments: []
                }
            }
        };
    },
    mutations: {},
    getters: {},
    actions: {}
}