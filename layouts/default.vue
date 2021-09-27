<template>
  <div class="main-page">
    <navbar class="main-page__navbar" />
    <div class="main-page__main">
      <Nuxt/>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";

export default {
  name: "default",
  components: { navbar },
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

.main-page {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-areas: "navbar main";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;

  &__navbar {
    grid-area: navbar;
    height: 100%;
  }

  &__main {
    grid-area: main;
    height: 100%;
    padding: 50px;
    overflow: auto;
  }

}
</style>
