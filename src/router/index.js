import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

const CamogroundsList = () =>
    import(
        /* webpackChunkName: "CamogroundsList" */ "@/views/campgrounds/CamogroundsList"
    );
const SignUp = () =>
    import(/* webpackChunkName: "SignUp" */ "@/views/SignUp.vue");
const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login.vue");
const UserDetails = () =>
    import(
        /* webpackChunkName: "UserDetails" */ "@/views/userDetails/UserDetails.vue"
    );
const CreateCampGround = () =>
    import(
        /* webpackChunkName: "CreateCampGround" */ "@/views/campgrounds/CreateCampGround.vue"
    );

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
        component: CamogroundsList
    },
    {
        path: "/create",
        name: "createCamp",
        component: CreateCampGround,
        meta: {
            authRequired: true
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
    },
    {
        path: "/account",
        name: "userDetails",
        component: UserDetails,
        meta: {
            authRequired: true
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
