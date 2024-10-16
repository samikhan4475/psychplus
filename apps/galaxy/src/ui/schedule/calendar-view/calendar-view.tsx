import { LoadingPlaceholder } from '@/components'
import { useBookedAppointmentsStore } from '../store'
import { BigCalendar } from './calendar'
import { CalendarFilterCard } from './calendar-filter-card'

const CalendarView = () => {
  const loading = useBookedAppointmentsStore((state) => state.loading)

  return (
    <>
      <CalendarFilterCard />
      {loading ? <LoadingPlaceholder /> : <BigCalendar />}
    </>
  )
}

export { CalendarView }
