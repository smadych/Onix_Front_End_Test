import {
  createModule, mutation, createProxy, action, extractVuexModule,
} from 'vuex-class-component';
import Vue from 'vue';
import Vuex from 'vuex';
import { srcImagesActivity, activity } from './activity';
import { TasksInterface, Status } from '@/Interfaces';

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt',
});

Vue.use(Vuex);

export class Store extends VuexModule {
  posts: any = []

  incertTasks: boolean = false

  errorMessage: string = 'The field is empty. Please type a title and description.'

  errorDeadline: string = 'Current date is not available. Please select a new one.'

  activity: object = activity

  objectForPopup: object = []

  srcImagesActivity: string[] = srcImagesActivity

  tasksArray: any[] = []

  get getImagesUrl() {
    return this.srcImagesActivity;
  }

  get infoActivity() {
    return this.activity;
  }
}

// store.vuex.ts
export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(Store),
  },
});

// Creating proxies.
export const vuexModule = {
  store: createProxy(store, Store),
};
