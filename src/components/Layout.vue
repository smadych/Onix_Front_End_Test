<!-- This component includes rest of components of this project -->
<template lang="pug">
  #layout
    //- Sends current index of the picture from Activity component
    AsideComponent(:index="currentPicture")
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
}
</script>

<style>
  @font-face {
    src: url(/fonts/HelveticaLight/HelveticaLight.ttf);
    font-family: Helvetica-Light;
}

#layout {
  display: flex;
  width: 100%;
}

* {
    margin: 0;
    padding: 0;
    background-image: url()
}

html, body {
    height: 100%;
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

  .notifications-block {
    min-width: 90%;
    min-height: 80%;
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
  .header-nav ul li {
    padding-bottom: 15px;
    margin-bottom: 10px;
    border-bottom: 2px solid transparent;
  }
  .header-nav ul li:hover {
    border-bottom: 2px solid #FFC200;
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

    // content section
    section {
        background-color: #EEEBE5;
        flex: 0 1 100%;
        flex-direction: row;
        box-sizing: border-box;
        .notifications-block {
            margin: 30px auto 100px auto;
            width: 70%;
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
                content: url(/images/Icon@3x.svg);
            }

            .message::before {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 40px;
                height: 40px;
                background-color: #FFF8DD;
                content: url(/images/chat.svg);
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
                background-image: url(/images/cloud-storage-download.svg);
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 15px;
            }

            .photo-icons {
                flex-flow: wrap;
                margin: 0 0 70px 87px;
                padding-bottom: 20px;
                .pic-first::before {
                    background-image: url(/images/dubai-island.jpg);
                }

                .pic-second::before {
                    background-image: url(/images/dubai-pic.jpeg);
                    background-size: 180px;
                }
                .pic-third::before {
                    background-image: url(/images/dubai-pic2.jpg);
                }
                .pic-fourth::before {
                    background-image: url(/images/burjkhalifa.jpg);
                }
                span {
                    margin-bottom: 10px;
                }
                span:hover {
                    cursor: pointer;
                }
            }
            .wraper-task {
                padding: 20px;
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
    table, th, td {
        border-collapse: collapse;
    }

    tr {
        text-align: center;
    }
    th {
        padding-bottom: 15px;
    }
    td {
        padding: 15px;
    }
    .clear, .add {
        width: 80px;
        font-size: 14px;
        background: #EAEAEA;
        padding: 8px 15px 8px 15px;
        border-radius: 15px;
        margin: 0 auto;
        margin-bottom: 10px;
        outline: none;
    }
}
</style>
