import Vue from 'vue'
import App from './App.vue'
import Element from './components/jcom'
import '../src/assets/element/theme-chalk/index.scss';
import store from './store';
import router from './router';
Vue.use(Element);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
