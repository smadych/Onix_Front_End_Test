<template lang="pug">
main
  section
   .notifications-block
    .wrapper-kanban
      ModalEdit(v-if='showModalEdit' @close='close' :indexOfTask='indexTask' )
      .input-wrapper
        input.search(type='text' placeholder='title filter' v-model='search')
        .input-date(ref='dateFilter')
          input.date-filter(type='date')
          input.date-filter(type='date')
          .wrapper-btn
            button.apply-btn(@click='runDateFilter') apply
            button.cencel(@click='cencelDateFilter') cencel
      .wrapper(ref='kanban')
        .todo
          h4(v-if='todoArrLength > 0') {{todoArrLength}}
          h4(v-else) no cards
          h3 {{status.todo}}
          draggable(:list="todoArr" id='todo' class="list-group" draggable=".item"
          :move='checkMove' group="a" @change="log"
          )
            div(class='item todoCard' v-for='(statusL, index) in filterTodoArr'
            @click='showModalEditFunc(statusL)'
            ) {{statusL.title}} - {{statusL.deadline}}
        .in-progress
          h4(v-if='inProgressArrLength > 0') {{inProgressArrLength}}
          h4(v-else) no cards
          h3 {{status.inProgress}}
          draggable(:list="inProgressArr" id='in-progress' class="list-group"
          draggable=".item" group="a" :move='checkMove' @change="log"
          )
            div(class='item inProgressCard' v-for='(statusL, index) in filterInProgressArr'
            @click='showModalEditFunc(statusL)'
            ) {{statusL.title}} - {{statusL.deadline}}
        .done
          h4(v-if='doneArrLength > 0') {{doneArrLength}}
          h4(v-else) no cards
          h3 {{status.done}}
          draggable(:list="doneArr" id='done' class="list-group" draggable=".item" group="a"
          :move='checkMove' @change="log"
          )
            div(class='item doneCard' v-for='(statusL, index) in filterDoneArr'
            @click='showModalEditFunc(statusL)'
            ) {{statusL.title}} - {{statusL.deadline}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { Status } from '@/Interfaces';
import ModalEdit from '../modal/ModalEdit.vue';

@Component({
  components: {
    ModalEdit,
    draggable,
  },
})
export default class Kanban extends Vue {
    status: any = Status

    localStore: any = []

    // An array from local storage
    storeArr: any = []

    showModalEdit: boolean = false

    indexTask: any = ''

    currentColumn: string = ''

    todoArr: any[] = []

    inProgressArr: any[] = []

    doneArr: any[] = []

    todoArrLength: number = 0

    inProgressArrLength: number = 0

    doneArrLength: number = 0

    currentEl: string = ''

    search: string = ''

    ref: any = this.$refs

    created() {
      this.getDataFromStorage();
      this.getTasks(this.storeArr);
      this.getLengthOfArrays();
    }

    mounted() {
      this.setClassDeadline();
    }

    updated() {
      this.getCurrentColumn();
      this.getLengthOfArrays();
      this.setClassDeadline();
    }

    beforeDestroy() {
      this.addDataToStorage();
    }

    get filterTodoArr(): object {
      return this.todoArr.filter(task => task.title.indexOf(this.search) !== -1);
    }

    get filterInProgressArr(): object {
      return this.inProgressArr.filter(task => task.title.indexOf(this.search) !== -1);
    }

    get filterDoneArr(): object {
      return this.doneArr.filter(task => task.title.indexOf(this.search) !== -1);
    }

    runDateFilter(): void {
      const date1 = this.ref.dateFilter.childNodes[0].value;
      const date2 = this.ref.dateFilter.childNodes[1].value;
      if (date1 !== '' && date2 !== '') {
        const copyStore = this.storeArr.filter(
          (task: any) => new Date(task.deadline.split('.').reverse().join('-'))
          >= new Date(this.ref.dateFilter.childNodes[0].value)
          && new Date(task.deadline.split('.').reverse().join('-'))
          <= new Date(this.ref.dateFilter.childNodes[1].value),
        );
        this.clearArrays();
        this.getTasks(copyStore);
      }
    }

    cencelDateFilter(): void {
      this.ref.dateFilter.childNodes[0].value = '';
      this.ref.dateFilter.childNodes[1].value = '';
      this.clearArrays();
      this.getTasks(this.storeArr);
    }

    getDataFromStorage(): void {
      this.localStore = sessionStorage.getItem('arr');
      this.storeArr = JSON.parse(this.localStore);
    }

    addDataToStorage(): void {
      this.storeArr = JSON.stringify(this.storeArr);
      sessionStorage.setItem('arr', this.storeArr);
    }

    getCurrentColumn(): void {
      if (this.todoArr.length > this.todoArrLength) {
        this.currentColumn = Status.todo;
      } else if (this.inProgressArr.length > this.inProgressArrLength) {
        this.currentColumn = Status.inProgress;
      } else if (this.doneArr.length > this.doneArrLength) {
        this.currentColumn = Status.done;
      }
    }

    getLengthOfArrays(): void {
      this.todoArrLength = this.todoArr.length;
      this.inProgressArrLength = this.inProgressArr.length;
      this.doneArrLength = this.doneArr.length;
    }

    setClassDeadline(): void {
      for (let j = 0; j < 2; j += 1) {
        if (j === 0) {
          this.setClass(this.todoArr, j);
        } else {
          this.setClass(this.inProgressArr, j);
        }
      }
    }

    setClass(array: any, j: number): void {
      for (let i = 0; i < array.length; i += 1) {
        const currCard = new Date(array[i].deadline.split('.').reverse().join('-'));
        if (
          this.ref.kanban.children[j].children[2].children[i].classList.contains('yellow-alert')) {
          this.ref.kanban.children[j].children[2].children[i].classList.remove('yellow-alert');
        } else if (
          this.ref.kanban.children[j].children[2].children[i].classList.contains('red-alert')) {
          this.ref.kanban.children[j].children[2].children[i].classList.remove('red-alert');
        }
        if (new Date().toLocaleDateString() === new Date(currCard).toLocaleDateString()) {
          this.ref.kanban.children[j].children[2].children[i].classList.add('yellow-alert');
        } else if (new Date().toLocaleDateString() > new Date(currCard).toLocaleDateString()) {
          this.ref.kanban.children[j].children[2].children[i].classList.add('red-alert');
        }
      }
    }

    getTasks(array: any): void {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i].status === Status.todo) {
          this.todoArr.push(array[i]);
        } else if (array[i].status === Status.inProgress) {
          this.inProgressArr.push(array[i]);
        } else {
          this.doneArr.push(array[i]);
        }
      }
    }

    close(): void {
      this.clearArrays();
      this.getDataFromStorage();
      this.getTasks(this.storeArr);
      this.getLengthOfArrays();
    }

    clearArrays(): void {
      this.showModalEdit = false;
      this.todoArr = [];
      this.inProgressArr = [];
      this.doneArr = [];
    }

    showModalEditFunc(statusL: object): void {
      for (let i = 0; i < this.storeArr.length; i += 1) {
        if (this.storeArr[i] === statusL) {
          this.indexTask = i;
        }
      }
      this.addDataToStorage();
      if (!this.showModalEdit) {
        this.showModalEdit = true;
      }
    }

    log(evt: object): void {
      for (let i = 0; i < this.storeArr.length; i += 1) {
        if (this.storeArr[i] === this.currentEl) {
          this.storeArr[i].status = this.currentColumn;
        }
      }
    }

    checkMove(event: any): boolean {
      this.currentEl = event.draggedContext.element;
      if (event.from.id === 'done' && event.to.id === 'todo') {
        return false;
      }
      return true;
    }
}
</script>

<style lang="scss" scoped>
  .notifications-block {
    .wrapper-kanban {
      width: 100%;
    }
    .wrapper {
      padding: 10px 0 30px 0;
      display: flex;
      border-radius: 8px;
      justify-content: space-around;
      flex-flow: wrap;
      flex-direction: row;
      .todo, .in-progress, .done, .item, h4 {
        border: 2px solid #EAEAEA;
      }
      div {
        border-radius: 8px;
        flex-direction: column;
        input {
          width: 93%;
          margin: 5px auto;
        }
        h3 {
          text-align: center;
          font-weight: 900;
          padding: 5px;
          margin-bottom: 20px;
        }
        h4 {
          text-align: center;
          margin: 3px;
          border-radius: 8px;
          padding: 0;
        }
      }
      .item {
        padding: 5px;
        margin: 0 3px 5px 3px;
        &:hover {
          background-color: #f0efef;
        }
      }
      .doneCard {
        background-color: #bdf7ba;
      }
      .inProgressCard {
        background-color: #ADD8E6;
      }
      .todoCard {
        background-color: #FFFACD;
      }
      .missDeadline {
        background-color: #FF7F50;
      }
      .red-alert {
        background-color: red;
      }
      .yellow-alert::after {
        content: url(/assets/images/attention.png);
        margin-left: 5px;
      }
    }
    .input-wrapper {
      display: flex;
      flex-direction: column;
      padding: 10px 0 10px 0;
      border-radius: 0 0 8px 8px;
      border: 2px solid #EAEAEA;
      width: 90%;
      margin: 0 auto;
      margin-bottom: 30px;
      .input-date {
        margin: 0 auto;
        padding: 5px;
        border: 2px solid #EAEAEA;
        border-radius: 5px;
        .wrapper-btn {
          display: flex;
          flex-flow: wrap;
          button {
            margin: 0 auto;
            display: block;
          }
        }
      }
      .search, .date-filter {
        margin: 0 auto;
        margin-bottom: 15px;
        border-radius: 5px;
        font-size: 15px;
        outline: none;
        border: 2px solid #EAEAEA;
      }
    }
  }
</style>
