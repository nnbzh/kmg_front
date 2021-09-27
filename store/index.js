export const state = {
  loadingCompanies: true,
  companies: [],

  loadingDetails: true,
  details: {},
}
export const getters = {
  getCompanies: state => state.companies,
  getCompaniesLoading: state => state.loadingCompanies,

  getDetails: state => state.details,
  getDetailsLoading: state => state.loadingDetails,
}
export const mutations = {
  setLoaderCompanies(state, val) {
    state.loadingCompanies = val;
  },
  setCompanies(state, list) {
    state.companies = list;
  },

  setLoadingDetails(state, val) {
    state.loadingDetails = val
  },
  setDetails(state, details) {
    state.details = details;
  }
}
export const actions = {
  async fetchCompanies({ commit }) {
    commit("setLoaderCompanies", true);
    commit("setCompanies", []);
    await this.$axios.get(`${process.env.backUrl}/companies`)
      .then(({ data }) => {
        commit("setCompanies", data?.data || []);
      })
      .catch(e => {
        alert("Проблемы с интернетом")
        console.log(e)
      })
    commit("setLoaderCompanies", false);
  },

  async fetchDetails({ commit }, id) {
    commit("setLoadingDetails", true);
    commit("setDetails", {})
    await this.$axios.get(`${process.env.backUrl}/graph?company_id=${id}`)
      .then(({ data }) => {
        commit("setDetails", data.data)
      })
      .catch(e => {
        console.log(e)
      })
    commit("setLoadingDetails", false);
  },

  async addFile({ commit, dispatch }, file) {
    let newForm = new FormData();
    newForm.append("file", file);

    await this.$axios({
      method: "post",
      url: `${process.env.backUrl}/import`,
      data: newForm,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => {
        if (data.status) {
          dispatch("fetchCompanies")
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
