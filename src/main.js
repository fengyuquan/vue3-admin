import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import installSvgIcon from './icons'
import i18n from './i18n'
import './styles/index.scss'
import './permission'

const app = createApp(App).use(createPinia())
installElementPlus(app)
installSvgIcon(app)
app.use(i18n).use(router).mount('#app')
