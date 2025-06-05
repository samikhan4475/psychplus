import { DateValue } from 'react-aria-components'
import { removeEmptyValues } from '@/ui/notes/utils'
import { getCalendarDateLabel } from '@/utils'
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
  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  switch (activeFilter) {
    case TableFilters.Today: {
      const dateStr = formatDate(today)
      return { dateFrom: dateStr, dateTo: dateStr }
    }
    case TableFilters.LastMonth: {
      const today = new Date()
      const firstDayOfCurrentMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      )
      const firstDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      )
      const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth.getTime() - 1)
      return {
        dateFrom: firstDayOfLastMonth.toISOString(),
        dateTo: lastDayOfLastMonth.toISOString(),
      }
    }
    case TableFilters.LastThirtyDays: {
      const last30 = new Date(today)
      last30.setDate(today.getDate() - 30)
      return {
        dateFrom: last30.toISOString(),
        dateTo: today.toISOString(),
      }
    }
    case TableFilters.LastNinetyDays: {
      const last90 = new Date(today)
      last90.setDate(today.getDate() - 90)
      return {
        dateFrom: last90.toISOString(),
        dateTo: today.toISOString(),
      }
    }
    case TableFilters.LastQuarter: {
      const last180 = new Date(today)
      last180.setDate(today.getDate() - 180)
      return {
        dateFrom: last180.toISOString(),
        dateTo: today.toISOString(),
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
    ...(data.dateFrom && { dateFrom: getCalendarDateLabel(data.dateFrom) }),
    ...(data.dateTo && { dateTo: getCalendarDateLabel(data.dateTo) }),
  }

  return removeEmptyValues(transformed)
}

export { getStateDisplayName, getDateRangeFromFilter, formatFilterFormData }
