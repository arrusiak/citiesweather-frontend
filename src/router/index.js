import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchCities from '@/views/SearchCities.vue'
import CitiesWeather from "@/views/CitiesWeather";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'searchCities',
    component: SearchCities
  },
  {
    path: '/weathers',
    name: 'citiesWeather',
    component: CitiesWeather
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
