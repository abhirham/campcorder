import Vue from 'vue'
import VueRouter from 'vue-router'

const ListCampgrounds = () => import( /* webpackChunkName: "about" */ '@/views/ListCampgrounds/container');
Vue.use(VueRouter)

const routes = [
  {
    path: '/:campgroundId?',
    name: 'viewCampground',
    props: true,
    component: ListCampgrounds
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router