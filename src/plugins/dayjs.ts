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

export default dayjs
