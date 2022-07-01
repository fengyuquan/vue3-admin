import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import useAppStore from '@/stores/app'

export default (app) => {
  const appStore = useAppStore()
  app.use(ElementPlus, { locale: appStore.language === 'en' ? en : zhCn })
}
