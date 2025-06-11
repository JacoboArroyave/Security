// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import './style.css'

// const app = createApp(App)
// app.use(router)
// app.mount('#app')

// main.js

// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import GoogleLogin from 'vue3-google-login'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(GoogleLogin, {
  clientId: '957915397315-heejc9v3hqv5vbg2r4ao2lo15snaaor1.apps.googleusercontent.com',
})

app.mount('#app')
