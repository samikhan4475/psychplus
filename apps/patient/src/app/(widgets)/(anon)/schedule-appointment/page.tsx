import { ScheduleAppointment } from './schedule-appointment-page'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from "@psychplus-v2/env"

const ScheduleAppointmentPage = () => {
  return <ScheduleAppointment mapKey={GOOGLE_MAPS_API_KEY} stripeKey={STRIPE_PUBLISHABLE_KEY} />
}

export default ScheduleAppointmentPage;
