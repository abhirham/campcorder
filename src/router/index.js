import Vue from "vue";
import VueRouter from "vue-router";

const ListCampgrounds = () =>
    import(/* webpackChunkName: "about" */ "@/views/ListCampgrounds/container");
const SignUp = () =>
    import(/* webpackChunkName: "about" */ "@/views/SignUp.vue");
Vue.use(VueRouter);

const routes = [
    {
        path: "camps/:campgroundId?",
        name: "viewCampground",
        props: true,
        component: ListCampgrounds,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
    },
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
});

export default router;
