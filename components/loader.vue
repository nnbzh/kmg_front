<template>
  <div class="loader">LOADING{{ dots }}</div>
</template>

<script>
export default {
  name: "loader",
  data: () => ({
    dots: "",
    MAX_COUNT: 4,
    SECOND: 1,
  }),
  methods: {
    interval() {
      if (this.dots.length <= this.MAX_COUNT) this.dots += ".";
      else this.dots = "";
    }
  },
  created() {
    setInterval(this.interval, this.SECOND * 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss" scoped>
.loader {
  font-weight: 600;
}
</style>
