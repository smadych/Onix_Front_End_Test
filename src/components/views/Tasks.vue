<!-- Tasks component which include table with title, description and time -->
<template lang="pug">
    main
        section
            .notifications-block
                .wraper-task
                  table.tableDesk
                    thead
                        tr
                            //- Main titles on the top
                            th(v-for="description in titlesTop"
                            v-bind:key="description") {{description}}
                    tbody
                        //- Prints tasks
                        tr(v-for="row in arr" v-bind:key="row")
                            td {{row.title}}
                            td {{row.decription}}
                            td {{row.time}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Describes data content which includes in each task
interface TasksInterface {
  title: string
  description: string
  time: string
}

@Component({})
export default class Tasks extends Vue {
  titlesTop: string[] = ['Title', 'Decription', 'Time']

  arr = [
    this.addNewTask('Work', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '10:00'),
    this.addNewTask('Chill', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '12:00'),
    this.addNewTask('Shopping', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '14:00'),
    this.addNewTask('Practice', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '19:00'),
  ]

  // Create new object with task data
  addNewTask (title: string, decription: string, time: string) {
    return { title, decription, time };
  }
}
</script>
