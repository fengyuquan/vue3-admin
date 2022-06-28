import { LANG, SIDERBAR_MENUS } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    activatedMenuItem: '/',
    language: getItem(LANG) ?? 'zh',
    siderbarMenus: getItem(SIDERBAR_MENUS) ?? []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    changeActivatedMenuItem(state, path) {
      state.activatedMenuItem = path
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    setSiderbarMenus(state, menus) {
      setItem(SIDERBAR_MENUS, menus)
      state.siderbarMenus = menus
    }
  },
  actions: {}
}
