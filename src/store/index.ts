import {
  createModule, mutation, createProxy, action, extractVuexModule,
} from 'vuex-class-component/dist';
import Vue from 'vue';
import Vuex from 'vuex';
import { srcImagesActivity, activity } from '@/store/activity';
import { TasksInterface, Status } from '@/Interfaces';
import { ToDo } from '@/store/todo';

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt',
});

Vue.use(Vuex);

export class Store extends VuexModule {
  posts: any = []

  incertTasks: boolean = false

  activity: object = activity

  objectForPopup: object = []

  srcImagesActivity: string[] = srcImagesActivity

  tasksArray: ToDo[] = [];

  isTodo: number = 0

  get getImagesUrl() {
    return this.srcImagesActivity;
  }

  get infoActivity() {
    return this.activity;
  }
}

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(Store),
  },
});

export const vuexModule = {
  store: createProxy(store, Store),
};
