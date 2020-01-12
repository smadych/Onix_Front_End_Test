<!-- Header component -->
<template lang="pug">
    header
        .logo
            .header-name
                h1 Website Redesign
                .btn-logo
                    span(class="dot-btn margin")
                    span(class="dot-btn margin")
                    span.dot-btn
            .header-btn
                .share
                    span(class="prof-icon first")
                    span(class="prof-icon second")
                    span(class="prof-icon third")
                    span.share-btn Share
                .chat
                    span.chat-btn Chat
        .header-nav
            //- Refers to Tasks component
            router-link(to="/tasks") Tasks
            //- Refers to Kanban component
            router-link(to="/kanban") Kanban
            //- Refers to Activity component
            router-link(to="/activity") Activity
            //- Refers to Calendar component
            router-link(to="/calendar") Calendar
            //- Refers to Files component
            router-link(to="/files") Files
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
});
</script>

<style lang="scss">
 // header styles
    header {
        font-family: Helvetica-Light;
        width: 100%;
        .logo {
            .header-name {
                h1 {
                    font-weight: 100;
                }
            }
            margin: 40px 0 20px 0;
            .header-name::before {
                background-image: url("/assets/images/Shapes@2x.png");
                margin: 0 15px 0 30px;
                background-color: #FFC200;
                border-radius: 10px;
                background-size: 40px 40px;
                min-width: 40px;
                height: 40px;
                content: '';
            }

            .header-name {
                .btn-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: auto 0 auto 10px;
                    min-width: 30px;
                    height: 30px;
                    background: #EAEAEA;
                    border-radius: 100%;
                        .dot-btn {
                            height: 4px;
                            width: 4px;
                            background: #9B9B9B;
                        }
                         .margin {
                            margin-right: 2px;
                        }
                }
            }

            .header-btn {
                flex-grow: 1;
                justify-content: flex-end;
                margin-right: 30px;
                .prof-icon {
                    width: 30px;
                    height: 30px;
                    margin: auto 0;
                    background-size: 30px;
                    content: '';
                }

                .first {
                    background-image: url(/assets/images/profile-cat.png);
                    margin-right: 5px;
                }
                .second {
                    background-image: url(/assets/images/profile-cat2.jpg);
                    border-radius: 100%;
                    margin-right: 5px;
                }
                .third {
                    background-image: url(/assets/images/profile-image-cat.png);
                }

                .share-btn {
                    background: #EAEAEA;
                    padding: 8px 15px 8px 15px;
                    border-radius: 15px;
                    margin: 0 15px 0 15px;
                }

                .chat-btn {
                    color: #FFC200;
                    background: #FFF8DD;
                    padding: 5px 15px 5px 15px;
                    border-radius: 15px;
                }
                .chat-btn::before {
                    background-image: url(/assets/images/Shape@1x.svg);
                    width: 20px;
                    height: 20px;
                    background-size: 20px;
                    margin-right: 5px;
                    content: '';
                }
            }
        }
        .header-nav {
            opacity: 0.7;
            font-size: 16px;
            font-weight: 200;
            padding-bottom: 12px;
                a {
                    text-decoration: none;
                    color: #5A5A5A;
                    margin-left: 30px;
                    padding-bottom: 12px;
                }
                a:hover {
                    border-bottom: 2px solid #FFC200;
                }
                a:focus {
                    border-bottom: 2px solid #FFC200;
                }
        }
    }
</style>
