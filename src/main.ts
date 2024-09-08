import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import dayjs from '@/plugins/dayjs'

const app = createApp(App)

// const dayJS = Symbol() as InjectionKey<typeof dayjs>
app.provide('dayJS', dayjs) // provide dayJS

app.mount('#app')
