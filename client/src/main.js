import Vue from 'vue'
import App from './App.vue'
import Element from './components/jcom'

import '../src/assets/element/theme-chalk/index.scss'
Vue.use(Element);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
