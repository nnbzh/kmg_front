<template>
  <div class="navbar">
    <div class="navbar__title">Список</div>
    <div class="navbar__list">
      <nuxt-link
        class="navbar__link--main"
        to="/"
      >Главная</nuxt-link>
      <nuxt-link
        class="navbar__link"
        v-for="company in companies" :key="company.id"
        :to="`/details/${company.id}`"
      >{{ company.name }}</nuxt-link>
    </div>
    <loader v-if="loading" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "./loader";

export default {
  name: "navbar",
  components: {Loader},
  computed: {
    ...mapGetters({
      companies: "getCompanies",
      loading: "getCompaniesLoading",
    })
  },
  methods: {
    ...mapActions({
      fetchCompanies: "fetchCompanies"
    })
  },
  mounted() {
    this.fetchCompanies();
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  border-right: 1px solid black;

  &__title {
    margin: 10px 0;
    font-size: 20px;
  }

  &__list {
    margin-top: 20px;
  }

  &__link {
    padding: 3px;
    display: block;
    cursor: pointer;
    color: black;

    &--main {
      @extend .navbar__link;
      margin-bottom: 20px;
    }

    &.nuxt-link-exact-active {
      background: black;
      color: white;
    }
    &:hover { opacity: .7 }
  }
}
</style>
