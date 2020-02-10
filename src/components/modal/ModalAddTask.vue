<template lang="pug">
transition(name='modal-fade')
  .modal-backdrop()
    .modal
      form(@submit.prevent="addTodo")
        h5 Add new task
        .input-wrapper()
          input.titleInput(type="text" name="title"
          placeholder="Enter the title" v-model="addTitle")
          input.descriptionInput(type="text" name="description"
          placeholder="Enter a description" v-model="addDescription")
          input(type='date' ref='getTime')
          p.errorMessage(v-if='showErrorMessage') {{vuexStore.errorMessage}}
          p.errorMessage(v-if='showErrorDeadline') {{vuexStore.errorDeadline}}
        .btn-wrapper
          button.add Add
          button.cencel(type="button" @click="close") cancel
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { vuexModule } from '@/store';

@Component({})
export default class ModalAddTask extends Vue {
  vuexStore: any = vuexModule.store

  addTitle: string = ''

  addDescription: any = ''

  deadline: any = ''

  showErrorMessage: boolean = false

  showErrorDeadline: boolean = false

  dom: any = this.$refs

  close(): void {
    this.$emit('close');
  }

  addTodo(): void {
    this.showErrorMessage = false;
    this.showErrorDeadline = false;
    if (this.addTitle === '' || this.addDescription === '') {
      this.showErrorMessage = true;
    } else if (new Date(this.dom.getTime.value) <= new Date() || this.dom.getTime.value === '') {
      this.showErrorDeadline = true;
    } else {
      this.getDedLine();
      this.$emit('sendTask', this.addTitle, this.addDescription, this.deadline);
      this.addTitle = '';
      this.addDescription = '';
    }
  }

  getDedLine(): void {
    const time = this.dom.getTime.value;
    this.deadline = new Date(time).toLocaleDateString();
  }
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
  }

  .modal {
    border-radius: 10px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    width: 250px;
    display: flex;
    flex-direction: column;
  }

  form {
        font-family: Helvetica-Light;
        display: flex;
        flex-direction: column;
        padding: 10px;
        .input-wrapper {
          display: flex;
          flex-direction: column;
          input {
            font-size: 18px;
            margin-bottom: 15px;
            border-radius: 5px;
          }
        }
    }
    h5 {
        font-size: 22px;
        margin: 10px auto;
        text-transform: uppercase;
    }
    .errorMessage {
      color: red;
      text-align: center;
      padding-bottom: 10px;
    }
    .btn-wrapper {
      display: flex;
      justify-content: center;
    }
</style>
