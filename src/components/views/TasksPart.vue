<!-- Tasks component which include table with title, description and time -->
<template lang="pug">
    main
        .newTask
          //- Form for adding tasks
          form(@submit.prevent="addTodo")
            h5 Add new task
            .input-wrapper
              input.titleInput(type="text" name="title"
              placeholder="Enter the title" v-model="addTitle")
              input.descriptionInput(type="text" name="description"
              placeholder="Enter a description" v-model="addDescription")
            button.add Add
        section
            .notifications-block
                .wraper-task
                  table.tableDesk
                    thead
                      th(v-for="list in titlesTop"
                      :key="list") {{list}}
                    tbody(ref='elements')
                      tr(v-for="(task, index) in arr" :key="index")
                          td {{task.title}}
                          td {{task.description}}
                          td {{task.time}}
                          td
                            button.clear(@click="removeTask(task)") delete
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TasksInterface } from '@/Interfaces';

@Component({})
export default class Tasks extends Vue {
  titlesTop: string[] = ['Title', 'Description', 'Time']

  // An array with tasks
  arr: TasksInterface[] = [
    { title: 'practice', description: 'studing', time: '10:00' },
    { title: 'chilling', description: 'walk in the park', time: '12:00' },
    { title: 'sleep', description: 'go to bad', time: '22:00' },
    { title: 'practice', description: 'studing', time: '10:00' },
  ]

  // Input for title
  addTitle: string = ''

  // Input for description
  addDescription: any = ''

  currTimeAndDate: string = ''

  domEl: any = this.$refs

  runBeforeUpdate: boolean = true

  runAnimationNewTask: boolean = false

  // Animates list with tasks when layout is available
  mounted() {
    for (let i = 0; i < this.arr.length; i += 1) {
      setTimeout(() => {
        this.domEl.elements.rows[i].classList.add('change-font-size');
      }, 1000 * i);
    }
  }

  // Anomates new task added
  updated() {
    if (this.runAnimationNewTask) {
      this.animationNewTask();
    }
  }

  // Removes class with animation when it's done
  beforeUpdate() {
    if (this.runBeforeUpdate) {
      for (let j = 0; j < this.arr.length; j += 1) {
        this.domEl.elements.rows[j].classList.remove('change-font-size');
      }
      this.runBeforeUpdate = false;
    }
  }

  // Gets current time and date
  getTimeAndDate(): void {
    const time: any = new Date();
    const date: string = `${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}`;
    this.currTimeAndDate = `${time.getHours()}:${time.getMinutes()} ${date}`;
  }

  animationNewTask(): void {
    if (this.arr.length >= 1) {
      this.domEl.elements.rows[0].classList.add('list-enter-active');
      setTimeout(() => {
        this.domEl.elements.rows[0].classList.remove('list-enter-active');
      }, 2000);
      this.runAnimationNewTask = false;
    }
  }

  addNewTask(): TasksInterface {
    const obj = {
      title: this.addTitle,
      description: this.addDescription,
      time: this.currTimeAndDate,
    };
    return obj;
  }

  // Adds new task into array
  addTodo(): void {
    if (this.addTitle === '' || this.addDescription === '') {
      alert('The field is empty. Please type a title and description');
    } else {
      this.getTimeAndDate();
      const task = this.addNewTask();
      this.addTitle = '';
      this.addDescription = '';
      this.arr.splice(0, 0, task);
      this.runAnimationNewTask = true;
    }
  }

  // Remove task with appropriate data from array
  removeTask(taskEl: TasksInterface): void {
    const indexEl: number = this.arr.indexOf(taskEl);
    this.arr.splice(indexEl, 1);
  }
}
</script>
