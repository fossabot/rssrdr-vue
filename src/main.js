// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Main Stuff
import Vue from 'vue';
import App from './App';
import router from './router';

// Other Stuff
import Notifications from 'vue-notification';

// Extra Other Stuff
Vue.use(Notifications);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
