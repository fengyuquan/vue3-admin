export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    activatedMenuItem: '/'
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    changeActivatedMenuItem(state, path) {
      state.activatedMenuItem = path
    }
  },
  actions: {}
}
