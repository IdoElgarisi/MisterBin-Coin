import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Contacts from '../views/Contacts.vue'
import ContactDetails from '../views/ContactDetails.vue'
import ContactEdit from '../views/ContactEdit.vue'
import Charts from '../views/Charts.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacts/edit/:contactId',
    name: 'Contact Edit',
    component: ContactEdit
  },
  {
    path: '/contacts/edit/',
    name: 'Contact Add',
    component: ContactEdit
  },
  {
    path: '/contacts/:contactId',
    name: 'Contact Details',
    component: ContactDetails
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/charts',
    name: 'Charts',
    component: Charts,
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  // },
  // {
  //   path: '/car/:carId',
  //   name: 'CarDetails',
  //   component: CarDetails
  // },
  // {
  //   path: '/car',
  //   name: 'Car',
  //   component: carPage,
  //   children: [
  //     {
  //       // path: 'edit/:id?',
  //       path: 'edit',
  //       name: 'car-edit',
  //       component: carEdit
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
