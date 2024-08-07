import { parseAbsoluteToLocal } from '@internationalized/date'
import { getCalendarDate } from '@psychplus-v2/utils'
import { AppointmentSortBy } from '../constants'
import { generateDateRange, getEarliestSlot } from '../utils'
import { useStore } from './store'

const useSortedFilteredData = () => {
  const { data, sortBy, language, startingDate } = useStore((state) => ({
    data: state.data,
    sortBy: state.sortBy,
    language: state.language,
    startingDate: state.startingDate,
  }))

  if (!data) {
    return []
  }

  const filteredData = data.filter((item) => {
    if (!language) {
      return true
    }
    const languageFilter = language === 'HindiUrdu' ? 'Hindi/Urdu' : language
    return item.specialist.spokenLanguages?.includes(languageFilter)
  })

  if (!sortBy || sortBy === AppointmentSortBy.Nearest) {
    return filteredData
  }

  if (sortBy === AppointmentSortBy.Rating) {
    return filteredData.sort(
      (a, b) => b.specialist.rating - a.specialist.rating,
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

    return parseAbsoluteToLocal(earliestSlotA.startDate).compare(
      parseAbsoluteToLocal(earliestSlotB.startDate),
    )
  })
}

export { useSortedFilteredData }
