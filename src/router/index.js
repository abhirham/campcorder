import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

const ListCampgrounds = () =>
    import(/* webpackChunkName: "about" */ "@/views/ListCampgrounds/container");
const SignUp = () =>
    import(/* webpackChunkName: "about" */ "@/views/SignUp.vue");
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: { name: "viewCampground" }
    },
    {
        path: "/camps/:campgroundId?",
        name: "viewCampground",
        props: true,
        component: ListCampgrounds
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
        meta: {
            noAuth: true
        }
    }
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (auth.currentUser && to.meta.noAuth) {
        next({ name: "viewCampground" });
    } else {
        next();
    }
});

export default router;
