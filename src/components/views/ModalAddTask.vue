<template lang="pug">
transition(name='modal-fade')
  .modal-backdrop
    .modal
      form(@submit.prevent="addTodo")
            h5 Add new task
            .input-wrapper
              input.titleInput(type="text" name="title"
              placeholder="Enter the title" v-model="addTitle")
              input.descriptionInput(type="text" name="description"
              placeholder="Enter a description" v-model="addDescription")
              p.errorMessage(v-if='showErrorMessage') {{errorMessage}}
            .btn-wrapper
              button.add Add
              button.cencel(type="button" @click="close") Cencel
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ModalAddTask extends Vue {
  addTitle: string = ''

  addDescription: any = ''

  errorMessage: string = 'The field is empty. Please type a title and description'

  showErrorMessage: boolean = false

  close() {
    this.$emit('close');
  }

  addTodo(): void {
    if (this.addTitle === '' || this.addDescription === '') {
      this.showErrorMessage = true;
    } else {
      this.$emit('sendTask', this.addTitle, this.addDescription);
      this.addTitle = '';
      this.addDescription = '';
    }
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
    display: flex;
    flex-direction: column;
  }

  form {
        font-family: Helvetica-Light;
        display: flex;
        flex-direction: column;
        padding: 10px;
        .input-wrapper {
            .titleInput {
                margin-right: 10px;
            }
        }
    }
    h5 {
        font-size: 22px;
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
    .errorMessage {
      color: red;
      text-align: center;
      padding-bottom: 10px;
    }
    .btn-wrapper {
      display: flex;
      justify-content: center;
      .cencel, .add {
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
