// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
import 'vuetify/dist/vuetify_mod.css'
import FullCalendar from 'vue-full-calendar'
// import 'fullcalendar/dist/fullcalendar.min.css'
import 'fullcalendar/dist/fullcalendar_mod.css'
import RegisterModal from './components/RegisterModal.vue'
import JournalModal from './components/JournalModal.vue'
import JournalModalForEdit from './components/JournalModalForEdit.vue'
import AddWorkTypeModal from './components/AddWorkTypeModal.vue'
import AddCustomItemModal from './components/AddCustomItemModal.vue'
import SearchAddressModal from './components/SearchAddressModal.vue'
import PredictModalForShow from './components/PredictModalForShow.vue'
import PredictItemModalForShow from './components/PredictItemModalForShow.vue'
import ChangePhoneNoModal from './components/ChangePhoneNoModal.vue'
import ChangePasswordModal from './components/ChangePasswordModal.vue'
import LeaveUserModal from './components/LeaveUserModal.vue'
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'
// https://alligator.io/vuejs/vue-media-queries/
import VueMq from 'vue-mq'
// https://www.npmjs.com/package/vue-session
import VueSession from 'vue-session'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

Vue.component('registerModal', RegisterModal)
Vue.component('journalModal', JournalModal)
Vue.component('journalModalForEdit', JournalModalForEdit)
Vue.component('addWorkTypeModal', AddWorkTypeModal)
Vue.component('addCustomItemModal', AddCustomItemModal)
Vue.component('searchAddressModal', SearchAddressModal)
Vue.component('predictModalForShow', PredictModalForShow)
Vue.component('predictItemModalForShow', PredictItemModalForShow)
Vue.component('changePhoneNoModal', ChangePhoneNoModal)
Vue.component('changePasswordModal', ChangePasswordModal)
Vue.component('leaveUserModal', LeaveUserModal)

Vue.use(Vuetify)
Vue.use(FullCalendar)
Vue.use(VeeValidate)
// http://frankclark.xyz/veevalidate-strong-password-and-confirmation-validation
VeeValidate.Validator.extend('verify_password', {
  getMessage: field => `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
  validate: value => {
    var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})')
    return strongRegex.test(value)
  }
})

Vue.use(VueSweetalert2)
Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity
  }
})
Vue.use(VueSession)
Vue.prototype.$http = axios
Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

export const bus = new Vue()
