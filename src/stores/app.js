import { LANG, SIDERBAR_MENUS, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import { defineStore } from 'pinia'

export default defineStore('app', {
  state: () => ({
    sidebarOpened: true,
    activatedMenuItem: '/',
    language: getItem(LANG) ?? 'zh',
    siderbarMenus: getItem(SIDERBAR_MENUS) ?? [],
    tagsViewList: getItem(TAGS_VIEW) ?? []
  }),
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    changeActivatedMenuItem(path) {
      this.activatedMenuItem = path
    },
    setLanguage(lang) {
      setItem(LANG, lang)
      this.language = lang
    },
    setSiderbarMenus(menus) {
      setItem(SIDERBAR_MENUS, menus)
      this.siderbarMenus = menus
    },
    // 添加 tags
    addTagsViewList(tag) {
      const isFind = this.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        this.tagsViewList.push(tag)
        setItem(TAGS_VIEW, this.tagsViewList)
      }
    },
    // 为指定的 tag 修改 title
    changeTagsView({ index, tag }) {
      this.tagsViewList[index] = tag
      setItem(TAGS_VIEW, this.tagsViewList)
    },
    // 删除 tag
    removeTagsView(fullPath) {
      this.tagsViewList = this.tagsViewList.filter(
        (item) => item.fullPath !== fullPath
      )
      setItem(TAGS_VIEW, this.tagsViewList)
    }
  }
})
