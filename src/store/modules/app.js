import { LANG, SIDERBAR_MENUS, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    activatedMenuItem: '/',
    language: getItem(LANG) ?? 'zh',
    siderbarMenus: getItem(SIDERBAR_MENUS) ?? [],
    tagsViewList: getItem(TAGS_VIEW) ?? []
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
    },
    // 添加 tags
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 为指定的 tag 修改 title
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    // 删除 tag
    removeTagsView(state, fullPath) {
      state.tagsViewList = state.tagsViewList.filter(
        (item) => item.fullPath !== fullPath
      )
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  actions: {}
}
