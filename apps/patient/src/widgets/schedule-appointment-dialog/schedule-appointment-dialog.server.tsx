import { unstable_noStore as noStore } from 'next/cache'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { ScheduleAppointmentDialogClient } from './schedule-appointment-dialog.client'

const ScheduleAppointmentDialogServer = async () => {
  noStore()

  return <ScheduleAppointmentDialogClient mapKey={GOOGLE_MAPS_API_KEY} />
}

export { ScheduleAppointmentDialogServer }
