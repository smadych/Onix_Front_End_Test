<!-- Activity component -->
<template lang="pug">
    main
        section
            .notifications-block
                .wraper-activity
                    h4 today
                    .have-done
                        .text-info
                            p {{info.haveDoneBlock}}
                        .time
                            p {{info.haveDoneTime}}
                    .message
                        .text-info
                            p {{info.messageBlock}}
                        .time
                            p {{info.messageTime}}
                    .additional
                        p {{info.additionalBlock}}
                    .upload
                        .text-info
                            p {{info.uploadBlock}}
                        .time
                            p {{info.uploadTime}}
                    .photo-icons(ref="picElements")
                        //- Pictures on the bottom. Realized by pseudo selectors
                        span.pic-first(@click="getIndex($event)")
                        span.pic-second(@click="getIndex($event)")
                        span.pic-third(@click="getIndex($event)")
                        span.pic-fourth(@click="getIndex($event)")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Activity extends Vue {
    info = {
      haveDoneBlock: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
      haveDoneTime: '8:40 PM',
      messageBlock: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
      messageTime: '7:32 PM',
      additionalBlock: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
      uploadBlock: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
      uploadTime: '6:02 PM',
    }

    currentPicture: number = 3

    // Gets class name from refs. Then compares them and give the index from the picture.
    getIndex(event: any): void {
      for (let i = 0; i < this.$refs.picElements.children.length; i += 1) {
        if (this.$refs.picElements.childNodes[i].className === event.target.className) {
          this.currentPicture = i;
          // Send an index from picture to parent component
          this.$emit('showIndex', this.currentPicture);
        }
      }
    }
}
</script>
