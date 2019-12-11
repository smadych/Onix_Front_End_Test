<template lang="pug">
main
    section
        .notifications-block
            h1 {{title}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class Files extends Vue {
    title: string = 'Comming soon..'
}
</script>

<style lang="scss" scoped>
h1 {
    text-align: center;
    font-weight: bolder;
}
</style>
