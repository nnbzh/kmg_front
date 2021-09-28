<template>
  <table border="1" class="company-table">

    <!-- HEAD -->
    <tr>
      <th colspan="4">fact</th>
      <th colspan="4">forecast</th>
    </tr>
    <tr>
      <th :colspan="dates.length">Qliq</th>
      <th :colspan="dates.length">Qoil</th>
      <th :colspan="dates.length">Qliq</th>
      <th :colspan="dates.length">Qoil</th>
    </tr>
    <tr>
      <th v-for="date in dates">{{ date }}</th> <!-- fact qlip -->
      <th v-for="date in dates">{{ date }}</th> <!-- fact qoil -->
      <th v-for="date in dates">{{ date }}</th> <!-- forecast qlip -->
      <th v-for="date in dates">{{ date }}</th> <!-- forecast qoil -->
    </tr>

    <!-- INFO -->
    <tr>
      <td v-for="val in info">{{ val }}</td>
    </tr>

  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
  },
  computed: {
    dates() {
      if (!this.data) return [];
      return this.data["qliq"]["fact"].map(item => item.x);
    },
    info() {
      if (!this.data) return [];
      return [
        ...this.data["qliq"]["fact"].map(item => item.y),
        ...this.data["qoil"]["fact"].map(item => item.y),
        ...this.data["qliq"]["forecast"].map(item => item.y),
        ...this.data["qoil"]["forecast"].map(item => item.y),
      ];
    }
  }
}
</script>

<style lang="scss" scoped>
.company-table {
  border-collapse: collapse;

  td, th {
    padding: 4px;
  }

}
</style>
