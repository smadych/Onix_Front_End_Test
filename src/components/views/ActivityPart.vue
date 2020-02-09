<!-- Activity component -->
<template lang="pug">
    main
        section
            .notifications-block
                .wraper-activity
                    h4 today
                    .have-done
                        .text-info
                            p {{info.haveDoneBlock.text}}
                        .time
                            p {{info.haveDoneBlock.time}}
                    .message
                        .text-info
                            p {{info.messageBlock.text}}
                        .time
                            p {{info.messageBlock.time}}
                    .additional
                        p {{info.additionalBlock.text}}
                    .upload
                        .text-info
                            p {{info.uploadBlock.text}}
                        .time
                            p {{info.uploadBlock.time}}
                    .photo-icons(ref="picElements")
                        img.pic(@click="getIndex(index)"
                        v-for='(image, index) in images' :key='index' :id='index' :src='image')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { vuexModule } from '@/store';

@Component({})
export default class Activity extends Vue {
  info: object = vuexModule.store.activity

  currentPicture: number = 3

  images: object = vuexModule.store.srcImagesActivity

  domPicture: any = this.$refs

  // Gets class name from refs. Then compares them and give the index from the picture.
  getIndex(event: any): void {
    for (let i = 0; i < this.domPicture.picElements.children.length; i += 1) {
      if (event === i) {
        this.currentPicture = i;
        // Send an index from picture to parent component
        this.$emit('showIndex', this.currentPicture);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-icons {
    flex-flow: wrap;
    margin: 30px 0 70px 87px;
    padding-bottom: 20px;
    .pic {
        width: 130px;
        height: 130px;
        margin: 0 10px 10px 0;
        border-radius: 8px;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
