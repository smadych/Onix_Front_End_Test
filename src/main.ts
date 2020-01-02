import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import TasksPart from './components/views/TasksPart.vue';
import ActivityPart from './components/views/ActivityPart.vue';
import CalendarPart from './components/views/CalendarPart.vue';
import FilesPart from './components/views/FilesPart.vue';
import KanbanPart from './components/views/KanbanPart.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/tasks', component: TasksPart },
  { path: '/activity', component: ActivityPart },
  { path: '/calendar', component: CalendarPart },
  { path: '/files', component: FilesPart },
  { path: '/kanban', component: KanbanPart },
  { path: '/', redirect: '/tasks' },
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
