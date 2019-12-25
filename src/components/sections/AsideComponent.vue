<!-- Sidebar component -->
<template lang="pug">
  aside
    .top-block
      .search
        h3 projectus
    .profile-block
      .profile-info
        .profile-name-position
          p.text-name {{userName}}
          p.position {{position}}
      .btn
        span(class="dot-btn margin")
        span(class="dot-btn margin")
        span.dot-btn
    .info-block
      .completed-tasks(@click="addTask()")
        p.number(id="completed-tasks-number") {{completedTasks}}
        p.task-status(id="completed-tasks") Completed Tasks
      .open-tasks
        p.number(id="open-tasks-number") {{openTasks}}
        //- Refs to Task component if an openTask variable greather then zero
        p.task-status(v-if='openTasks > 0')
          router-link(to="/tasks") Open Tasks
        p.task-status(v-else) Open Tasks
    nav.nav-block
      ul
        li.menu Menu
        li Home
        li My Tasks
        li.notifications Notifications
          span#notifications-number.notifications-number {{index}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  // Take index of picture from Activity component
  props: {
    index: Number,
  },
})
export default class Aside extends Vue {
  completedTasks: number = 372;

  openTasks: number = 11;

  notificationNumber: number = 3;

  userName: string = 'Jean Gonzales';

  position: string = 'Product Owner';

  // Adds completed projects
  addTask() {
    if (this.openTasks > 0) {
      if (window.confirm('Are you sure you want to change the number of tasks?')) {
        this.completedTasks += 1;
        this.openTasks -= 1;
      }
    } else {
      alert('There are no open tasks!');
    }
  }
}
</script>

<style>

@font-face {
    src: url(/assets/fonts/HelveticaLight/HelveticaLight.ttf) format('ttf');
    font-family: Helvetica-Light;
    font-weight: normal;
    font-style: normal;
}

    .top-block, .search, .profile-block, .profile-info, .info-block {
  display: flex;
}

.top-block, .profile-block {
  align-items: center;
}

.search, .profile-info {
  margin-left: 30px;
}

.profile-block, .info-block {
  height: 80px;
}

aside {
  width: 270px;
  background-color: black;
  color: white;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
  flex-shrink: 0;
}
aside .top-block {
  height: 84px;
}
aside .top-block h3 {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  padding: 5px 0;
}
aside .top-block .search::before {
  margin: auto 13px auto 0;
  content: url(/assets/images/Logo@3x.svg);
}
aside .top-block .search::after {
  content: '';
  background-image: url('/assets/images/12search.svg');
  background-size: 22px 22px;
  background-repeat: no-repeat;
  margin: auto 0 auto 70px;
  height: 25px;
  width: 25px;
}
aside .top-block .search::after:hover {
  cursor: pointer;
}
aside .profile-block {
  flex-flow: row;
  background: #202020;
}
aside .profile-block .profile-info {
  flex-flow: row;
}
aside .profile-block .profile-info .profile-name-position {
  margin: auto 0;
}
aside .profile-block .profile-info .profile-name-position .text-name {
  font-size: 14px;
  margin-bottom: 2px;
}
aside .profile-block .profile-info .profile-name-position .position {
  font-size: 12px;
  color: #9B9B9B;
}
aside .profile-block .btn {
  margin: 0 0 0 45px;
  min-width: 16px;
  display: table;
}
aside .profile-block .btn .dot-btn {
  height: 4px;
  width: 4px;
  background-color: #EAEAEA;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
aside .profile-block .btn .margin {
  margin-right: 2px;
}
aside .profile-block .btn:hover {
  cursor: pointer;
}
aside .profile-block .profile-info::before {
  background-image: url(/assets/images/profile.png);
  margin: auto 13px auto 0;
  display: block;
  min-width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60px;
  background-color: white;
  border-radius: 50%;
  content: '';
}
aside .info-block {
  font-family: Helvetica-Light;
  letter-spacing: 0.5px;
}
aside .info-block .completed-tasks {
  flex-grow: 1;
  margin: auto auto auto 30px;
}
aside .info-block .open-tasks {
  flex-grow: 4;
  margin: auto 0;
}
aside .info-block .number {
  font-size: 20px;
  font-weight: lighter;
}
aside .info-block .task-status {
  font-size: 12px;
  opacity: 0.5;
}
aside .info-block .task-status a {
  text-decoration: none;
  color: white;
}
aside .nav-block {
  letter-spacing: 0.5px;
}
aside .nav-block ul {
  margin-left: 30px;
  font-weight: lighter;
  list-style: none;
  font-size: 14px;
  line-height: 22px;
}
aside .nav-block ul li {
  color: white;
  margin-bottom: 16px;
}
aside .nav-block ul li:hover {
  cursor: pointer;
}
aside .nav-block ul .menu {
  text-transform: uppercase;
  font-size: 12px;
  color: #878787;
  line-height: 18px;
  margin-bottom: 18px;
}
aside .nav-block ul .notifications-number {
  margin-left: 10px;
  background: #FFC200;
  font-size: 13px;
  color: #131313;
  border-radius: 100%;
  padding: 1px 6px 1px 6px;
}
</style>
