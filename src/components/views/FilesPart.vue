<template lang="pug">
main
    section
        .notifications-block
            //- h1 {{title}}
            .wrapper-files
                .files(v-for='image in imagesSrc') {{image}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Files extends Vue {
    imagesSrc: object = this.$store.state.srcImagesActivity
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
</style>
