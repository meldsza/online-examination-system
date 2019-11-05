import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { createProvider } from './vue-apollo'
import 'material-design-icons/iconfont/material-icons.css'

Vue.use(VueMaterial)
// register the plugin on vue
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "top-right",
  duration: 2000
})

import SideNav from './components/SideNav.vue'
Vue.component('SideNav', SideNav)
const timesync = require('timesync/dist/timesync')
const ts = timesync.create({
  server: process.env.VUE_APP_TIMESYNC || 'http://localhost:4000/timesync',
  interval: 10000
});
const moment = require('moment')
Vue.mixin({
  methods: {
    getTimeDiffInMinutes(t1, t2) {
      return (moment(t1).diff(moment(t2), 'minutes'))
    },
    getTimeDiffInSec(t1, t2) {
      t1 = new Date(t1)
      t2 = new Date(t2)
      return (moment(t1).diff(moment(t2), 'seconds'))
    },
    getCurrentTimeFromServer() {
      return (new Date(ts.now())).toISOString().slice(0, 19).replace('T', ' ')
    }
  }
})
new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
