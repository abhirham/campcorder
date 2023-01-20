import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

const ListCampgrounds = () =>
    import(/* webpackChunkName: "about" */ "@/views/ListCampgrounds/container");
const SignUp = () =>
    import(/* webpackChunkName: "about" */ "@/views/SignUp.vue");
const Login = () => import(/* webpackChunkName: "about" */ "@/views/Login.vue");
const CreateCampGround = () =>
    import(/* webpackChunkName: "about" */ "@/views/CreateCampGround.vue");

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
        path: "/create",
        name: "createCamp",
        component: CreateCampGround,
        meta: {
            authOnly: true
        }
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
        meta: {
            noAuth: true,
            fillHeight: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            noAuth: true,
            fillHeight: true
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
