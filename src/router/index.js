import Vue from 'vue';
import Router from 'vue-router';

// Vue Components
import Index from '@/components/Index';
import MyFeed from '@/components/MyFeed';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'Index', component: Index},
    { path: '/myfeed', name: 'My Feed', component: MyFeed}
  ]
});
