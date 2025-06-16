import { getCalendarDate, getMin, normalizeLanguageFilter, sortByFunc } from '@psychplus-v2/utils'
import { AppointmentSortBy } from '../constants'
import {
  generateDateRange,
  getEarliestSlot,
  parseDateAbsoluteToLocal,
} from '../utils'
import { useStore } from './store'

const useSortedFilteredData = () => {
  const { data, sortBy, language, startingDate } = useStore()

  if (!data) {
    return []
  }

  const filteredData = data.filter((item) => {
    if (!language) {
      return true
    }
    const languageFilter = normalizeLanguageFilter(language)
    return item.specialist.spokenLanguages?.includes(languageFilter)
  })

  if (!sortBy) {
    return filteredData
  }

  if (sortBy === AppointmentSortBy.Nearest) {
    return sortByFunc(filteredData, (item) =>
      getMin(item.clinics, (c) => c.distanceInMiles),
    )
  }

  if (sortBy === AppointmentSortBy.Rating) {
    return  sortByFunc(filteredData, (item) =>
    -(item.specialist.rating ?? 0)
  )
  }

  const dateRange = generateDateRange(getCalendarDate(startingDate))

  return filteredData.sort((a, b) => {
    const earliestSlotA = getEarliestSlot(a.allSlotsByDay, dateRange)
    const earliestSlotB = getEarliestSlot(b.allSlotsByDay, dateRange)

    if (!earliestSlotA) {
      return earliestSlotB ? 1 : 0
    } else if (!earliestSlotB) {
      return earliestSlotA ? -1 : 0
    }
    return parseDateAbsoluteToLocal(earliestSlotA, earliestSlotB)
  })
}

export { useSortedFilteredData }
