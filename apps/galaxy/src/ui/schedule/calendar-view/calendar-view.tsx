import { LoadingPlaceholder } from '@/components'
import { BigCalendar } from './calendar'
import { CalendarFilterCard } from './calendar-filter-card'
import { useStore } from './store'

const CalendarView = () => {
  const { loading } = useStore((state) => ({
    loading: state.loading,
  }))

  return (
    <>
      <CalendarFilterCard />
      {loading ? <LoadingPlaceholder /> : <BigCalendar />}
    </>
  )
}

export { CalendarView }
