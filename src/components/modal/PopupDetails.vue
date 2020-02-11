<template lang="pug">
transition(name='modal-fade')
    .modal-backdrop(@click.self='$emit("close")')
        .modal
            h3 Details
            .wrapper
                .status
                    h5 Status
                    p {{vuexStore.objectForPopup.originalEvent.status}}
                .title
                    h5 Title
                    p {{vuexStore.objectForPopup.originalEvent.title}}
                .description
                    h5 Description
                    p {{vuexStore.objectForPopup.originalEvent.description}}
                .deadline
                    h5 Deadline
                    p {{vuexStore.objectForPopup.originalEvent.deadline}}
            .btn-wrapper
                button.cencel(
                type="button" @click='$emit("close")') close
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { vuexModule } from '@/store';

export default class PopupDetails extends Vue {
    vuexStore: any = vuexModule.store
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  .modal {
    width: 300px;
    border-radius: 10px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
        text-align: center;
        margin: 10px 0 5px 0;
    }
    .wrapper {
        width: 90%;
        display: table-cell;
        vertical-align: middle;
        h5 {
            font-size: 15px;
            margin-bottom: 5px;
        }
        p {
            font-size: 12px;
        }
        margin: 10px 0 15px 0;
        text-align: left;

        .title, .description, .time, .status {
            margin-bottom: 10px;
        }
        .time {
            color: black;
            text-align: left;
            margin: 0;
        }
    }
  }

    .btn-wrapper {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        flex-flow: wrap;
    }
  }

</style>
