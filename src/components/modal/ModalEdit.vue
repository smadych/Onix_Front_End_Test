<template lang="pug">
transition(name='modal-fade')
    .modal-backdrop()
        .modal
            h3 Edit task
            .wrapper()
                .defaultCondition(v-if='!editMode')
                    .title
                        h5 Title
                        p {{storage[indexOfTask].title}}
                    .description
                        h5 Description
                        p {{storage[indexOfTask].description}}
                .editMode(v-else='editMode')
                    .title
                        h5 Title
                        textarea(v-model='storage[indexOfTask].title'
                        v-on='checkTyping(storage[indexOfTask].title)'
                        ) {{storage[indexOfTask].title}}
                    .description
                        h5 Description
                        textarea(v-model='storage[indexOfTask].description'
                        v-on='checkTyping(storage[indexOfTask].description)'
                        ) {{storage[indexOfTask].description}}
            .btn-wrapper
                button.save(v-if='saveButton' @click='saveChanges') save
                button.edit(type="button" @click="changeMode"
                v-if="buttonMode === 'edit'") {{buttonMode}}
                button.edit(v-else-if="buttonMode === 'cencel'"
                type="button" @click="close") cencel
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import index from '@/store';

@Component({
  props: {
    indexOfTask: Number,
  },
})
export default class ModalEdit extends Vue {
  title: string = ''

  editMode: boolean = false

  localStore: any = sessionStorage.getItem('arr')

  storage: any = JSON.parse(this.localStore);

  buttonMode: string = 'edit'

  indexTask: number = 0

  description: string = ''

  saveButton: boolean = false

  close(): void {
    this.$emit('close');
  }

  changeMode(): void {
    if (this.buttonMode === 'edit') {
      this.editMode = true;
      this.title = this.storage[this.$props.indexOfTask].title;
      this.description = this.storage[this.$props.indexOfTask].description;
      this.buttonMode = 'cencel';
    }
  }

  checkTyping(textareaData: any): void {
    if (!(this.title === this.storage[this.$props.indexOfTask].title)
    || !(this.description === this.storage[this.$props.indexOfTask].description)) {
      this.saveButton = true;
    }
  }

  saveChanges(): void {
    this.localStore = JSON.stringify(this.storage);
    sessionStorage.setItem('arr', this.localStore);
    this.close();
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
        h5 {
            font-size: 15px;
            margin-bottom: 5px;
        }
        p {
            font-size: 12px;
        }
        margin: 10px 0 15px 0;
        text-align: left;

        .title, .description, .time {
            margin-bottom: 10px;
        }
        .time {
            color: black;
            text-align: left;
            margin: 0;
        }
        textarea {
            width: 100%;
            min-height: 50px;
            font-size: 14px;
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
