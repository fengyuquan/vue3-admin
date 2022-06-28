import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) ?? DEFAULT_COLOR
  }),
  mutations: {
    setMainColor(state, color) {
      state.mainColor = color
      setItem(MAIN_COLOR, color)
    },
    resetMainColor(state) {
      state.mainColor = DEFAULT_COLOR
      setItem(MAIN_COLOR, DEFAULT_COLOR)
    }
  },
  actions: {}
}
