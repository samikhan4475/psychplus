import { getLocalTimeZone, parseTime, today } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import { removeEmptyValues } from '@/ui/notes/utils'
import { getCalendarDateLabel } from '@/utils'
import { getDateString } from '../schedule/utils'
import { TableFilters } from './constants'

interface Code {
  display: string
  value: string
}

type InputData = {
  dateFrom?: DateValue
  dateTo?: DateValue
  stateCodes?: string[]
  [key: string]: any
}

const getStateDisplayName = (codes: Code[], state: string) => {
  return codes.find((element) => element.value === state)?.display
}

const getDateRangeFromFilter = (activeFilter?: string) => {
  const tz = getLocalTimeZone()
  const todayDate = today(tz)

  switch (activeFilter) {
    case TableFilters.Today: {
      const dateStr = getDateString(todayDate, tz)!
      return { dateFrom: dateStr, dateTo: dateStr }
    }

    case TableFilters.LastMonth: {
      const jsToday = todayDate.toDate(tz)

      const firstDayOfCurrentMonth = new Date(
        jsToday.getFullYear(),
        jsToday.getMonth(),
        1,
      )
      const firstDayOfLastMonth = new Date(
        jsToday.getFullYear(),
        jsToday.getMonth() - 1,
        1,
      )
      const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth.getTime() - 1)

      return {
        dateFrom: firstDayOfLastMonth.toISOString(),
        dateTo: lastDayOfLastMonth.toISOString(),
      }
    }

    case TableFilters.LastThirtyDays: {
      const jsToday = todayDate.toDate(tz)
      const last30 = new Date(jsToday)
      last30.setDate(jsToday.getDate() - 30)
      return {
        dateFrom: last30.toISOString(),
        dateTo: jsToday.toISOString(),
      }
    }

    case TableFilters.LastNinetyDays: {
      const jsToday = todayDate.toDate(tz)
      const last90 = new Date(jsToday)
      last90.setDate(jsToday.getDate() - 90)
      return {
        dateFrom: last90.toISOString(),
        dateTo: jsToday.toISOString(),
      }
    }

    case TableFilters.LastQuarter: {
      const jsToday = todayDate.toDate(tz)
      const last180 = new Date(jsToday)
      last180.setDate(jsToday.getDate() - 180)
      return {
        dateFrom: last180.toISOString(),
        dateTo: jsToday.toISOString(),
      }
    }

    default:
      return {}
  }
}

function formatFilterFormData<T extends InputData>(
  data: T,
): Partial<Record<string, any>> {
  const transformed: Record<string, any> = {
    ...data,
    ...(data.dateFrom && { dateFrom: getDateString(data.dateFrom) }),
    ...(data.dateTo && { dateTo: getDateString(data.dateTo?.add({ days: 1 })) }),
  }

  return removeEmptyValues(transformed)
}

export { getStateDisplayName, getDateRangeFromFilter, formatFilterFormData }
