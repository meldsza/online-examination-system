import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { createProvider } from './vue-apollo'

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


new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
