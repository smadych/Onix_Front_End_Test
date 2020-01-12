<template lang="pug">
main
    section
        .notifications-block
            table.tableDesk
                thead
                    th(v-for='statusList in status') {{statusList}}
                tbody
                    td(v-for='statusList in status')
                        tr
                            td.status(v-for='task in storeArr'
                            v-if='task.status === statusList') {{task.title}} - {{task.time}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Status } from '@/Interfaces';

@Component({})
export default class Kanban extends Vue {
    status: object = Status

    localStore: any = sessionStorage.getItem('arr')

    // An array from local storage
    storeArr: any = JSON.parse(this.localStore);
}
</script>

<style lang="scss" scoped>
    .status {
        display: flex;
    }
    tr {
        border: none !important;
    }
    td {
        border-bottom: 1px solid #f0efef;
    }
</style>
