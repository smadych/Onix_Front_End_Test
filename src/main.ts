import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Tasks from './components/views/Tasks.vue';
import Activity from './components/views/Activity.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/tasks', component: Tasks },
  { path: '/activity', component: Activity },
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
