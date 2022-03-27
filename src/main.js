import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installSvgIcon from './icons'

import './styles/index.scss'
import './permission'

const app = createApp(App)
installElementPlus(app)
installSvgIcon(app)
app.use(store).use(router).mount('#app')
