<template>
  <div class="details">
    <loader v-if="loading" />
    <div class="details__info" v-else>
      <p class="details__title">{{ companyInfo.name }}</p>

      <companytable :data="details" />

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
import Companytable from "../../components/companytable";

export default {
  components: {Companytable, Loader},
  computed: {
    ...mapGetters({
      list: "getCompanies",
      details: "getDetails",
      loading: "getDetailsLoading",
    }),
    id() {
      return this.$route.params.id;
    },
    companyInfo() {
      return this.list
          .find(c => +c.id === +this.id)
          || {name:"No name"};
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
  created() {
    this.fetchDetails(this.id);
  }
}
</script>

<style lang="scss" scoped>
.details {
  overflow: auto;
  &__title {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
