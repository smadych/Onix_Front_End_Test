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
                    tbody
                      transition-group.wrapper-table(name="list" tag="div")
                          th(v-for="description in titlesTop"
                          v-bind:key="description") {{description}}
                          tr(v-for="(task) in arr" v-bind:key="task" ref='elements')
                              td {{task.title}}
                              td {{task.description}}
                              td {{task.time}}
                              td
                                button.clear(@click="removeEl(task)") clear
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TasksInterface } from '@/Interfaces';

const space = ' ';

function addTasks(title: string, description: any, time: string): TasksInterface {
  return { title, description, time };
}
@Component({})
export default class Tasks extends Vue {
  titlesTop: string[] = ['Title', 'Description', 'Time']

  // An array with tasks
  arr: TasksInterface[] = [
    addTasks('practice', 'running', '10:00'),
    addTasks('chilling', 'walk in the park', '12:00'),
    addTasks('sleep', 'go to bad', '22:00'),
  ]

  // Input for title
  addTitle: string = ''

  // Input for description
  addDescription: any = ''

  currTimeAndDate: string = ''

  index: number = 0

  mounted() {
    for (let i = 0; i < this.arr.length; i += 1) {
      setTimeout(() => {
        this.$refs.elements[i].classList.add('change-font-size');
      }, 1000 * i);
    }
  }

  // Gets current time and date
  getTimeAndDate(): void {
    const time = new Date();
    const date: string = `${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}`;
    this.currTimeAndDate = `${time.getHours()}:${time.getMinutes()} ${date}`;
  }

  // Adds new task into array
  addTodo(): void {
    if (this.addTitle === '' || this.addDescription === '') {
      alert('The field is empty. Please type a title and description');
    } else {
      this.getTimeAndDate();
      const task: TasksInterface = {
        title: this.addTitle,
        description: this.addDescription,
        time: this.currTimeAndDate,
      };
      this.addTitle = '';
      this.addDescription = '';
      this.arr.splice(0, 0, task);
    }
  }

  // Remove task with appropriate data from array
  removeEl(taskEl: TasksInterface): void {
    const index = this.arr.indexOf(taskEl);
    this.arr.splice(index, 1);
  }
}
</script>
