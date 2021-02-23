import Vue from 'vue'
import VueRouter from 'vue-router'

const ListCampgrounds = () => import( /* webpackChunkName: "about" */ '@/views/ListCampgrounds/container');
const ViewCampground = () => import( /* webpackChunkName: "about" */ '@/views/ViewCampgrounds/container');
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: ListCampgrounds
  },
  {
    path: '/:campgroundId',
    name: 'viewCampground',
    props: true,
    component: ViewCampground
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router