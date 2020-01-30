<template lang="pug">
main
  section
   .notifications-block
     ModalEdit(v-if='showModalEdit' @close='close' :indexOfTask='indexTask' )
     .wrapper
      .todo
        input(type='text' placeholder='type here..' v-model='title')
        h4(v-if='todoArrLength > 0') {{todoArrLength}}
        h4(v-else) no cards
        h3 {{status.todo}}
        draggable(:list="todoArr" id='todo' class="list-group" draggable=".item"
        :move='checkMove' group="a" @change="log"
        )
          div(class='item todoCard' v-for='(statusL, index) in todoArr'
          @click='showModalEditFunc(statusL)'
          ) {{statusL.title}} - {{statusL.time}}
      .in-progress
        input(type='text' placeholder='type here..')
        h4(v-if='inProgressArrLength > 0') {{inProgressArrLength}}
        h4(v-else) no cards
        h3 {{status.inProgress}}
        draggable(:list="inProgressArr" id='in-progress' class="list-group"
        draggable=".item" group="a"
        :move='checkMove'
        @change="log"
        )
          div(class='item inProgressCard' v-for='(statusL, index) in inProgressArr'
          @click='showModalEditFunc(statusL)'
          ) {{statusL.title}} - {{statusL.time}}
      .done
        input(type='text' placeholder='type here..')
        h4(v-if='doneArrLength > 0') {{doneArrLength}}
        h4(v-else) no cards
        h3 {{status.done}}
        draggable(:list="doneArr" id='done' class="list-group" draggable=".item" group="a"
        :move='checkMove' @change="log"
        )
          div(class='item doneCard' v-for='(statusL, index) in doneArr'
          @click='showModalEditFunc(statusL)'
          ) {{statusL.title}} - {{statusL.time}}
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

    title: string = ''

    created() {
      this.getDataFromStorage();
      this.getTasks();
      this.getLengthOfArrays();
    }

    updated() {
      this.getCurrentColumn();
      this.getLengthOfArrays();
    }

    beforeDestroy() {
      this.addDataToStorage();
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

    getTasks(): void {
      for (let i = 0; i < this.storeArr.length; i += 1) {
        if (this.storeArr[i].status === Status.todo) {
          this.todoArr.push(this.storeArr[i]);
        } else if (this.storeArr[i].status === Status.inProgress) {
          this.inProgressArr.push(this.storeArr[i]);
        } else {
          this.doneArr.push(this.storeArr[i]);
        }
      }
    }

    close(): void {
      this.clearArrays();
      this.getDataFromStorage();
      this.getTasks();
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

    log(evt: any): void {
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
    .wrapper {
      padding: 30px 0 30px 0;
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
        display: flex;
        flex-direction: column;
        input {
          width: 93%;
          margin: 5px auto;
          border-radius: 5px;
          font-size: 14px;
          outline: none;
          border: 2px solid #EAEAEA;
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
        min-width: 100px;
      }
      .newDivs {
        display: flex;
        flex-direction: row;
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
    }
</style>
