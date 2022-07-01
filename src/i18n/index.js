import { createI18n } from 'vue-i18n'
import { getItem } from '@/utils/storage'
import { LANG } from '@/constant'
import mEnLocale from './lang/en'
import mZhLocale from './lang/zh'

const messages = {
  en: {
    ...mEnLocale
  },
  zh: {
    ...mZhLocale
  }
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getItem(LANG) ?? 'zh',
  messages
})

export default i18n
