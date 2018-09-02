import '@babel/polyfill';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import container from '@/di/container';

// Plugins
import '@/plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

