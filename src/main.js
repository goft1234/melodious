import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
import 'bootstrap'
import 'popper.js'
import './assets/app.scss'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/_variables.scss';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
Vue.use(datePicker);

import ThailandAutoComplete from 'vue-thailand-address-autocomplete'
Vue.component('ThailandAutoComplete', ThailandAutoComplete)

import moment from 'moment';
moment.locale('th');

import VueGoodTablePlugin from 'vue-good-table';
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
Vue.use(VueGoodTablePlugin);

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)


Vue.component('Navbar', require('./components/Navbar.vue').default)
Vue.component('Footer', require('./components/Footer.vue').default)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')