import { LoadingPlaceholder } from '@/components'
import { BigCalendar } from './calendar'
import { CalendarFilterCard } from './calendar-filter-card'
import { useEffect } from 'react'
import { useStore } from './store'

const CalendarView = () => {
  const { loading, fetchData } = useStore(state => ({
    loading: state.loading,
    fetchData: state.fetchData,
  }))

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <CalendarFilterCard />
      {loading ? <LoadingPlaceholder /> : <BigCalendar />}
    </>
  )
}

export { CalendarView }
