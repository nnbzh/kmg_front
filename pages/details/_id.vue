<template>
  <div class="details">
    <loader v-if="loading" />
    <div class="details__info" v-else>
      <p class="details__title">qliq</p>
      <apexchart
        class="details__graph"
        width="370"
        :options="options_qliq"
        :series="series_qliq"
        type="line"
      />
      <p class="details__title">qoil</p>
      <apexchart
        class="details__graph"
        width="370"
        :options="options_qoil"
        :series="series_qoil"
        type="line"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loader from "../../components/loader";

export default {
  components: {Loader},
  computed: {
    ...mapGetters({
      details: "getDetails",
      loading: "getDetailsLoading",
    }),
    id() {
      return this.$route.params.id;
    },
    options_qliq() {
      return {
        chart: {
          id: 'details'
        },
        xaxis: {
          categories: this.details["qliq"]["fact"].map(item => item.x),
        }
      }
    },
    series_qliq() {
      return [
        {
          name: 'fact',
          data: this.details["qliq"]["fact"].map(item => item.y)
        },
        {
          name: 'forecast',
          data: this.details["qliq"]["forecast"].map(item => item.y)
        },
      ]
    },
    options_qoil() {
      return {
        chart: {
          id: 'details'
        },
        xaxis: {
          categories: this.details["qoil"]["fact"].map(item => item.x),
        }
      }
    },
    series_qoil() {
      return [
        {
          name: 'fact',
          data: this.details["qoil"]["fact"].map(item => item.y)
        },
        {
          name: 'forecast',
          data: this.details["qoil"]["forecast"].map(item => item.y)
        },
      ]
    },
  },
  methods: {
    ...mapActions({
      fetchDetails: "fetchDetails"
    })
  },
  mounted() {
    this.fetchDetails(this.id);
  }
}
</script>

<style lang="scss" scoped>
.details {
  &__title {
    margin-top: 20px;
  }
}
</style>
