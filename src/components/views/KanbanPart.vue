<template lang="pug">
main
  section
   .notifications-block
     table.tableDesk
        ModalEdit(v-if='showModalEdit' @close='close' :indexOfTask='indexTask')
        thead
           th(v-for='statusList in status') {{statusList}}
        tbody
           td(v-for='(statusList, index) in status'
           :key='index')
            tr
             td.status(v-for='(task, index) in storeArr'
             :key='index'
             v-if='task.status === statusList'
             @click='showModalEditFunc(indexTask=index)') {{task.title}} - {{task.time}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Status } from '@/Interfaces';
import ModalEdit from './ModalEdit.vue';

@Component({
  components: {
    ModalEdit,
  },
})
export default class Kanban extends Vue {
    status: object = Status

    localStore: any = sessionStorage.getItem('arr')

    showModalEdit: boolean = false

    indexTask: any = ''

    // An array from local storage
    storeArr: any = JSON.parse(this.localStore);

    close() {
      this.showModalEdit = false;
    }

    showModalEditFunc(index: number) {
      if (!this.showModalEdit) {
        this.showModalEdit = true;
      }
    }
}
</script>

<style lang="scss" scoped>
    .status {
        display: flex;
    }
    .status:hover {
        background-color: #f0efef;
    }
    tr {
        border: none !important;
    }
    td {
        border-bottom: 1px solid #f0efef;
    }
</style>
