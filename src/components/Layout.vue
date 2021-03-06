<!-- This component includes rest of components of this project -->
<template lang="pug">
  #layout
    .sandwich(v-if='closeSidebarStatus' @click='closeSidebarStatus = false')
      .sandwich-btn
      .sandwich-btn
      .sandwich-btn
    //- Sends current index of the picture from Activity component
    AsideComponent(v-if='!closeSidebarStatus' :index="currentPicture"
    v-on:closeSidebarProp='closeSedebarFunc')
    main
        HeaderComponent
        //- Show an appropriate component
        router-view(@showIndex="currentPicture=$event")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AsideComponent from './sections/AsideComponent.vue';
import HeaderComponent from './sections/HeaderComponent.vue';

@Component({
  components: {
    AsideComponent, HeaderComponent,
  },
})
export default class Layout extends Vue {
  currentPicture: number = 3

  closeSidebarStatus: boolean = false

  closeSedebarFunc(status: boolean) {
    this.closeSidebarStatus = status;
  }
}
</script>

<style>
  @font-face {
    src: url(/assets/fonts/HelveticaLight/HelveticaLight.ttf);
    font-family: Helvetica-Light;
}

#layout {
  display: flex;
  width: 100%;
}
#layout .sandwich {
    padding: 15px;
}
#layout .sandwich-btn {
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
}
* {
    margin: 0;
    padding: 0;
}

html, body {
    height: 100%;
    min-height: 100% !important;
}

body {
    display: flex;
    height: 100vh;
    font-family: 'Open Sans', sans-serif;
}

@media only screen and (max-width: 1024px) {
  .logo {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    margin: 10px 0 20px 0 !important;
  }

  .header-btn {
    margin-left: 30px;
    flex-flow: wrap;
    justify-content: flex-start !important;
  }
}
@media only screen and (max-width: 870px) {
  body {
    display: block;
  }

  #layout {
    display: block;
  }

  aside {
    width: 100%;
  }

  /* .wraper-task {
      font-size: 10px;
  } */

  .info-block {
    flex-flow: column;
    margin: 20px 0 20px 0;
  }

  .completed-tasks {
    margin: auto auto 5px 30px !important;
  }

  .share {
    margin-bottom: 5px;
  }

  .open-tasks {
    margin-left: 30px !important;
  }

  header {
    height: auto !important;
  }

  .header-name {
    margin-bottom: 10px;
  }

  .header-nav ul {
    margin-left: 30px;
    display: flex;
    flex-flow: wrap;
    list-style: none;
  }
  .header-nav a {
    margin-bottom: 13px;
    border-bottom: 2px solid transparent;
  }
  .header-nav ul li:hover {
    border-bottom: 2px solid #FFC200;
  }
  section {
      overflow: auto;
  }
}

@media only screen and (min-width: 870px) {
  section {
    vertical-align: top;
    height: 100%;
    overflow: auto;
  }
}

</style>

<!-- Styles for header and main content -->
<style lang="scss">
// main section styles

main, .logo, .header-name, .header-btn, .share, .chat-btn,
.message, .have-done, .upload, .photo-icons {
    display: flex;
}

.header-name, .header-btn, .share, .chat-btn {
    align-items: center;
}

.header-name, .share, .chat-btn {
    justify-content: center;
}

.header-name::before, .prof-icon,
.chat-btn::before, .upload::before, .pic-first::before,
.pic-second::before, .pic-third::before, .pic-fourth::before {
    display: block;
}

.btn-logo:hover, .prof-icon:hover, .share-btn:hover, .chat-btn:hover, li:hover,
.completed-tasks:hover {
    cursor: pointer;
}

.share-btn, li:hover, .text-info {
    color: #131313;
}

.header-nav, .time, h4 {
    color: #5A5A5A;
}

.pic-first::before, .pic-second::before, .pic-third::before {
    margin-right: 10px;
}

.pic-first::before, .pic-third::before, .pic-fourth::before {
    background-size: 150px;
}

.dot-btn, .have-done::before, .message::before, .upload::before {
    border-radius: 50%;
}

.message, .upload {
    margin: 0 0 20px 30px;
}

.message::before, .have-done::before, .upload::before {
    margin: auto 20px auto 0;
}

.upload::before, .pic-first::before, .pic-second::before, .pic-third::before, .pic-fourth::before {
    background-repeat: no-repeat;
}

.pic-first::before, .pic-second::before, .pic-third::before, .pic-fourth::before {
    width: 100px;
    height: 100px;
    border-radius: 8px 8px;
    content: '';
}

main {
    flex-direction: column;
    height: 100vh;
    flex-grow: 1;
    overflow: hidden;

    // content section
    section {
        background-color: #EEEBE5;
        flex: 0 1 100%;
        flex-direction: row;
        box-sizing: border-box;
        height: 100vh;
        .notifications-block {
            margin: 30px auto 100px auto;
            border-radius: 8px;
            background: #ffffff;

            .text-info {
                flex: auto;
                font-size: 16px;
            }

            .time {
                min-width: 35px;
                font-weight: lighter;
                font-size: 14px;
                line-height: 20px;
                flex-grow: 1;
                text-align: right;
                margin-right: 30px;
            }

            h4 {
                text-transform: uppercase;
                font-size: 14px;
                font-weight: lighter;
                margin: 0 0 32px 30px;
                padding-top: 20px;
            }

            .have-done {
                margin: 0 0 30px 30px;
            }

            .have-done::before {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 40px;
                height: 40px;
                background-color: #CEF9C6;
                content: url(/assets/images/Icon@3x.svg);
            }

            .message::before {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 40px;
                height: 40px;
                background-color: #FFF8DD;
                content: url(/assets/images/chat.svg);
            }

            .additional {
                max-width: 80%;
                border-radius: 10px;
                background-color: #F7F6F3;
                margin: 0 30px 30px 87px;
                p {
                    padding: 20px 30px;
                }
            }

            .upload::before {
                background-color: #E3EFFF;
                min-width: 40px;
                height: 40px;
                content: "";
                display: block;
                background-image: url(/assets/images/cloud-storage-download.svg);
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 15px;
            }
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
}
    @keyframes animationForNewTask {
        0% {
            background-color: white;
        }
        25% {
            background-color: #EEEEEE;
        }
        50% {
            background-color: white;
        }
        75% {
            background-color: #EEEEEE;
        }
        100% {
            background-color: white;
        }
    }
    @keyframes animationForList {
        50% {
            font-size: 18px;
        }
        100% {
            font-size: 16px;
        }
    }
    .tableDesk {
        // padding-top: 30px !important;
        .task-area {
            border-bottom: 1px solid white;
        }
        .task-area:hover {
            background-color: white;
        }
    }
    table, th, td {
        border-collapse: collapse;
    }
    .change-font-size {
        animation-name: animationForList;
        animation-duration: 1s;
    }
    .list-enter-active {
        animation-name: animationForNewTask;
        animation-duration: 2s;
        animation-iteration-count: 1;
    }

    tr {
        text-align: center;
    }
    td {
        padding: 15px;
    }
    .clear, .add-task, .edit, .save, .cencel, .add, .apply-btn {
        width: 80px;
        font-size: 14px;
        background: #EAEAEA;
        padding: 8px 15px 8px 15px;
        border-radius: 15px;
        margin: 0 auto;
        margin-bottom: 10px;
        outline: none;
        cursor: pointer;
    }
    .add-task {
        margin-top: 5px;
        min-width: 120px;
    }
}
</style>
