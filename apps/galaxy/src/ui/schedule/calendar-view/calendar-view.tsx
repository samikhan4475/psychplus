import { useEffect } from 'react'
import { LoadingPlaceholder } from '@/components'
import { useProviderId } from '../hooks'
import { BigCalendar } from './calendar'
import { CalendarFilterCard } from './calendar-filter-card'
import { useStore } from './store'

const CalendarView = () => {
  const { loading, fetchData } = useStore((state) => ({
    loading: state.loading,
    fetchData: state.fetchData,
  }))
  const providerId = useProviderId()

  useEffect(() => {
    if (!providerId) return
    fetchData({ providerIds: [Number(providerId)] })
  }, [])

  return (
    <>
      <CalendarFilterCard />
      {loading ? <LoadingPlaceholder /> : <BigCalendar />}
    </>
  )
}

export { CalendarView }
