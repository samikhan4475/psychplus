import { unstable_noStore as noStore } from 'next/cache'
import { ScheduleAppointmentDialogClient } from './schedule-appointment-dialog.client'

const ScheduleAppointmentDialogServer = async () => {
  noStore()

  return <ScheduleAppointmentDialogClient />
}

export { ScheduleAppointmentDialogServer }
