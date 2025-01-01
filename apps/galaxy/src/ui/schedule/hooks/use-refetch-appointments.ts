import { useRefetch } from '../list-view/hooks'
import { useRefetch as useRoundingViewRefetch } from '../rounding-view/hooks'
import { useRefetch as useCalendarViewRefetch } from '../calendar-view/hooks'
import { useStore } from '../store'
import { TabValue } from '../types'

const useRefetchAppointments = () => {
  const { activeTab } = useStore()
  const refetchListViewData = useRefetch()
  const refetchRoundingViewData = useRoundingViewRefetch()
  const refetchCalendarViewData = useCalendarViewRefetch()

  switch (activeTab) {
    case TabValue.List:
      return refetchListViewData
    case TabValue.Rounding:
      return refetchRoundingViewData
    case TabValue.Calendar:
      return refetchCalendarViewData
    default:
      return refetchListViewData
  }
}

export { useRefetchAppointments }
