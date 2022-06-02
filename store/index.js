export const state = () => ({
  liffInfo: null
})

export const mutations = {
  lineLogin ( state, data ) {
    state.liffInfo = data;
  }
}

export const actions = {
  lineLogin ({ commit }, data) {
    commit('lineLogin', data)
  }
}