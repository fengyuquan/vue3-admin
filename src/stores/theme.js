import { defineStore } from 'pinia'
import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import variables from '@/styles/variables.module.scss'

export default defineStore('theme', {
  state: () => ({
    mainColor: getItem(MAIN_COLOR) ?? DEFAULT_COLOR
  }),
  getters: {
    /** @type {{menuText: string, menuActiveText: string, subMenuActiveText: string, menuBg: string, menuHover: string, subMenuBg: string, subMenuHover: string, sideBarWidth: string}{}} */
    cssVar: (state) => ({ ...variables, menuBg: state.mainColor })
  },
  actions: {
    setMainColor(color) {
      this.mainColor = color
      setItem(MAIN_COLOR, color)
    },
    resetMainColor() {
      this.mainColor = DEFAULT_COLOR
      setItem(MAIN_COLOR, DEFAULT_COLOR)
    }
  }
})
