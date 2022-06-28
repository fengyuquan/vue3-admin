import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installSvgIcon from './icons'
import i18n from './i18n'

import './styles/index.scss'
import './permission'

const app = createApp(App)
installElementPlus(app)
installSvgIcon(app)
app.use(i18n).use(store).use(router).mount('#app')
