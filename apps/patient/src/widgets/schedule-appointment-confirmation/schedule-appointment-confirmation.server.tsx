import { unstable_noStore as noStore } from 'next/cache'
import ScheduleAppointmentConfirmationClient from './schedule-appointment-confirmation.client'

const ScheduleAppointmentConfirmationServer = async () => {
  noStore()

  return <ScheduleAppointmentConfirmationClient />
}

export { ScheduleAppointmentConfirmationServer }
