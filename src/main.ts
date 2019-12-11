import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Tasks from './components/views/Tasks.vue';
import Activity from './components/views/Activity.vue';
import Calendar from './components/views/Calendar.vue';
import Files from './components/views/Files.vue';
import Kanban from './components/views/Kanban.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/tasks', component: Tasks },
  { path: '/activity', component: Activity },
  { path: '/calendar', component: Calendar },
  { path: '/files', component: Files },
  { path: '/kanban', component: Kanban },
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
