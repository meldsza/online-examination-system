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
  interval: 1000
});
Vue.mixin({
  methods: {
    getCurrentTimeFromServer() {
      return new Date(ts.now())
    }
  }
})
new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
