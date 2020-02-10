<!-- Tasks component which include table with title, description and time -->
<template lang="pug">
    main
        button.add-task(@click='showM') Add task
        ModalAddTask(v-if='showModal' @close='close'
        v-on:sendTask='(...args)=>this.sendTask(...args)')
        ModalEdit(v-if='showModalEdit' @close='close' :indexOfTask='indexTask')
        section
          .wraper-task
            table.tableDesk
              thead
                th(v-for="list in titlesTop"
                :key="list") {{list}}
              tbody(ref='elements')
                tr.task-area(v-for="(task, index) in vuexStore.tasksArray" :key="index")
                  td(@click='showModalEditFunc(indexTask=index)'
                  ) {{task.status}}
                  td(@click='showModalEditFunc(indexTask=index)') {{task.title}}
                  td(@click='showModalEditFunc(indexTask=index)') {{task.description}}
                  td(@click='showModalEditFunc(indexTask=index)') {{task.time}}
                  td(@click='showModalEditFunc(indexTask=index)') {{task.deadline}}
                  td
                    button.clear(@click="removeTask(task)") delete
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TasksInterface, Status } from '@/Interfaces';
import ModalAddTask from '../modal/ModalAddTask.vue';
import ModalEdit from '../modal/ModalEdit.vue';
import { vuexModule } from '@/store';

@Component({
  components: {
    ModalAddTask,
    ModalEdit,
  },
})
export default class Tasks extends Vue {
  titlesTop: string[] = ['Status', 'Title', 'Description', 'Time', 'Deadline']

  vuexStore: any = vuexModule.store

  // Status of task
  addStatus: string = ''

  // Input for title
  addTitle: string = ''

  // Input for description
  addDescription: any = ''

  deadLine: string = ''

  time: Date = new Date();

  // DOM elements
  domEl: any = this.$refs

  runBeforeUpdate: boolean = false

  runAnimationNewTask: boolean = false

  showModal: boolean = false

  showModalEdit: boolean = false;

  indexTask: number = 0

  mounted() {
    this.initialAddingArray();
    this.addsClassForAnimation();
    this.runBeforeUpdate = true;
  }

  updated() {
    this.removeClassAnimation();
    if (this.runAnimationNewTask) {
      this.animationNewTask();
    }
  }

  // Removes class with animation when it's done
  removeClassAnimation(): void {
    for (let j = 0; j < this.vuexStore.tasksArray.length; j += 1) {
      this.domEl.elements.rows[j].classList.remove('change-font-size');
    }
    this.runBeforeUpdate = false;
  }

  // Animate list when page is load
  addsClassForAnimation(): void {
    for (let i = 0; i < this.vuexStore.tasksArray.length; i += 1) {
      setTimeout(() => {
        this.domEl.elements.rows[i].classList.add('change-font-size');
      }, 1000 * i);
    }
  }

  // Adds lists with tasks if an array is empty
  initialAddingArray(): void {
    if (!this.vuexStore.incertTasks) {
      this.vuexStore.tasksArray = [
        {
          status: Status.todo, title: 'practice', description: 'studing', time: new Date().toLocaleDateString(), deadline: this.generateDeadline(),
        },
        {
          status: Status.inProgress, title: 'chilling', description: 'walk in the park', time: new Date().toLocaleDateString(), deadline: this.generateDeadline(),
        },
        {
          status: Status.done, title: 'sleep', description: 'go to bad', time: new Date().toLocaleDateString(), deadline: this.generateDeadline(),
        },
        {
          status: Status.done, title: 'practice', description: 'studing', time: new Date().toLocaleDateString(), deadline: this.generateDeadline(),
        },
        {
          status: Status.todo, title: 'practice', description: 'studing', time: new Date().toLocaleDateString(), deadline: this.generateDeadline(),
        },
      ];
      this.vuexStore.incertTasks = true;
    }
  }

  // Gets current time and date
  generateDeadline(): string {
    const currDate = this.time;
    currDate.setDate(currDate.getDate() + Math.floor(Math.random() * Math.floor(5)));
    const deadLine = new Date(currDate).toLocaleDateString();
    return deadLine;
  }

  // Animates new added task to the list
  animationNewTask(): void {
    if (this.vuexStore.tasksArray.length >= 1) {
      this.domEl.elements.rows[0].classList.add('list-enter-active');
      setTimeout(() => {
        this.domEl.elements.rows[0].classList.remove('list-enter-active');
      }, 2000);
      this.runAnimationNewTask = false;
    }
  }

  addNewTask(): TasksInterface {
    const task = {
      status: Status.todo,
      title: this.addTitle,
      description: this.addDescription,
      time: new Date().toLocaleDateString(),
      deadline: this.deadLine,
    };
    return task;
  }

  // Adds new task into array
  addTodo(): void {
    const task = this.addNewTask();
    this.addTitle = '';
    this.addDescription = '';
    this.deadLine = '';
    this.vuexStore.tasksArray.splice(0, 0, task);
    this.runAnimationNewTask = true;
  }

  // Remove task with appropriate data from array
  removeTask(taskEl: TasksInterface): void {
    const indexEl: number = this.vuexStore.tasksArray.indexOf(taskEl);
    this.vuexStore.tasksArray.splice(indexEl, 1);
  }

  showM(): void {
    if (!this.showModal) {
      this.showModal = true;
    }
  }

  showModalEditFunc(index: number): void {
    if (!this.showModalEdit) {
      this.showModalEdit = true;
    }
  }

  close(): void {
    this.initialAddingArray();
    this.showModal = false;
    this.showModalEdit = false;
  }

  sendTask(title: string, description: string, deadLine: string): void {
    this.addTitle = title;
    this.addDescription = description;
    this.deadLine = deadLine;
    this.close();
    this.addTodo();
  }
}
</script>

<style lang="scss">
section {
  .wraper-task {
    padding-top: 30px;
  }
}
.newTask {
    border: 2px solid #EAEAEA;
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    margin: 5px auto;
    form {
        display: flex;
        flex-direction: column;
        .input-wrapper {
            .titleInput {
                margin-right: 10px;
            }
        }
    }
    h5 {
        margin: 10px auto;
        text-transform: uppercase;
    }
    input {
        margin: 0 auto;
        font-size: 20px;
        outline: none;
        border-radius: 5px;
    }
    .titleInput {
        margin-bottom: 5px;
    }
    .descriptionInput {
        margin-bottom: 15px;
    }
}
    table {
        padding: 30px;
        width: 80%;
        margin: 0 auto;
    }
    .task-area {
      border-radius: 5px;
    }
    .notifications-block {
      // background-color: aqua !important;
      margin: 30px auto 100px auto;
      width: 90%;
      // min-width: 90%;
      // min-height: 80%;
    }
</style>
