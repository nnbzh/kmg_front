<template>
  <div class="main">
    <p class="main__title">Добавление компаний</p>
    <input
      id="file"
      type="file"
      @input="inputHandle"
    />
    <button
      class="main__send"
      :disabled="!file"
      @click="save">Сохранить</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    file: null,
  }),
  methods: {
    ...mapActions({
      addFile: "addFile"
    }),
    inputHandle(e) {
      this.file = e.target.files ? e.target.files[0] : null;
    },
    save() {
      if (!this.file) return null

      this.addFile(this.file);
      this.clear();
    },
    clear() {
      this.file = null;
      document.getElementById("file").value = "";
    }
  }
}
</script>
<style lang="scss">
.main {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 20px;
  }

  &__send {
    cursor: pointer;
    font-size: 20px;
    width: fit-content;
    margin-top: 20px;
  }

}
</style>
