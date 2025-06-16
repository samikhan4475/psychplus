import { unstable_noStore as noStore } from 'next/cache'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { ScheduleAppointmentListClient } from './schedule-appointment-list.client'

const ScheduleAppointmentListServer = async () => {
  noStore()

  return <ScheduleAppointmentListClient mapKey={GOOGLE_MAPS_API_KEY} />
}

export { ScheduleAppointmentListServer }
