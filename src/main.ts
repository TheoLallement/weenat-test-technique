import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isToday from 'dayjs/plugin/isToday'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.locale('fr')
dayjs.extend(localeData)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(isToday)
dayjs.extend(isoWeek)

const app = createApp(App)

// const dayJS = Symbol() as InjectionKey<typeof dayjs>
app.provide('dayJS', dayjs) // provide dayJS

app.mount('#app')
