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
  count: number = 3

  posts: any = []

  activity: object = activity

  srcImagesActivity: string[] = srcImagesActivity

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
