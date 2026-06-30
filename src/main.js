import './assets/css/design-tokens.css'
import './assets/css/base.css'
import './assets/css/animations.css'
import './assets/css/services.css'
import './assets/css/projects.css'
import './assets/css/about.css'
import './assets/css/contact.css'
import './assets/css/directory-pages.css'
import './assets/css/page-hero.css'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')
