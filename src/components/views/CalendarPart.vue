<template lang="pug">
main
    PopupDetails(v-if='showPopup' @close='closePopup')
    section
        .notifications-block
          calendar-view.theme-default.holiday-us-traditional.holiday-us-official(
            :events="events" :show-date="showDate" locale="en" @click-event="onClickEvent"
            v-if='showCalendar')
            calendar-view-header(
            slot='header'
            slot-scope='t'
            @input="setShowDate"
            :header-props='t.headerProps'
            )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
import PopupDetails from '../modal/PopupDetails.vue';
import { vuexModule } from '@/store';

require('vue-simple-calendar/static/css/default.css');
require('vue-simple-calendar/static/css/holidays-us.css');

@Component({
  components: {
    CalendarView,
    CalendarViewHeader,
    PopupDetails,
  },
})
export default class Calendar extends Vue {
  vuexStore: any = vuexModule.store

  showDate: Date = new Date()

  events: any = this.vuexStore.tasksArray

  showPopup: boolean = false

  showCalendar: boolean = true;

  created() {
    for (let i = 0; i < this.events.length; i += 1) {
      this.events[i].startDate = this.events[i].deadline.split('.').reverse().join('-');
    }
  }

  onClickEvent(calendarItem: any, windowEvent: any) {
    this.vuexStore.objectForPopup = calendarItem;
    this.showCalendar = false;
    this.showPopup = true;
  }

  setShowDate(date: any) {
    this.showDate = date;
  }

  closePopup() {
    this.showPopup = false;
    this.showCalendar = true;
  }
}
</script>

<style lang="scss" scoped>
h1 {
    text-align: center;
    font-weight: bolder;
}
.notifications-block {
    height: 80%;
    .cv-wrapper {
        border: 1px solid #D3D3D3 !important;
        border-radius: 8px;
        height: 90% !important;
        border: none;
    }
}
</style>
