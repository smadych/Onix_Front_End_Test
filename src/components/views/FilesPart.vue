<template lang="pug">
main
    section
        .notifications-block
            .wrapper-files
                .files(v-for='image in images') {{image}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { vuexModule } from '@/store';

@Component({})
export default class Files extends Vue {
  images: any = vuexModule.store.getImagesUrl
}
</script>

<style lang="scss" scoped>
.wrapper-files{
    font-family: Helvetica-Light;
    font-weight: bold;
    padding: 20px;
    display: flex;
    flex-flow: wrap;
    flex-direction: column;
    .files {
        text-align: center;
        padding: 10px 0 10px 0;
        margin-bottom: 10px;
        border: 2px solid #EAEAEA;
        border-radius: 8px;
        &:hover {
            background-color: antiquewhite;
        }
    }

}
.posts {
    display: flex;
    width: 50%;
    flex-direction: column;
    margin: 0 auto;
    border: 1px solid black;
    margin-bottom: 20px;
    h2 {
        text-align: center;
    }
    div {
    }
}
</style>
