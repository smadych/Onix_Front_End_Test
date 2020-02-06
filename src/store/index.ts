import Vue from 'vue';
import Vuex from 'vuex';
import { TasksInterface, Status } from '@/Interfaces';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 3,

    activity: {
      haveDoneBlock: {
        text: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
        time: '8:40 PM',
      },
      messageBlock: {
        text: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
        time: '7:32 PM',
      },
      additionalBlock: {
        text: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
      },
      uploadBlock: {
        text: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
        time: '6:02 PM',
      },
    },

    srcImagesActivity: [
      '/assets/images/dubai-island.jpg',
      '/assets/images/dubai-pic.jpeg',
      '/assets/images/dubai-pic2.jpg',
      '/assets/images/burjkhalifa.jpg',
    ],
  },
  getters: {
    getCount: state => state.count,
  },
  mutations: {
    // increment: state => state.count += 1,
    // decrement: state => state.count -= 1
  },
  actions: {
  },
  modules: {
  },
});
