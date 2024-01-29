import { unstable_noStore as noStore } from 'next/cache'
import { ScheduleAppointmentListClient } from './schedule-appointment-list.client'

const ScheduleAppointmentListServer = async () => {
  noStore()

  return <ScheduleAppointmentListClient />
}

export { ScheduleAppointmentListServer }
