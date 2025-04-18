import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { AppointmentsConfirmationsView } from '@/events/appointments'

interface AppointmentsConfirmationsProps {
  params: { id: string }
}
const AppointmentsConfirmationsPage = ({
  params,
}: AppointmentsConfirmationsProps) => (
  <AppointmentsConfirmationsView
    appointmentId={params.id}
    mapKey={GOOGLE_MAPS_API_KEY}
  />
)

export default AppointmentsConfirmationsPage
