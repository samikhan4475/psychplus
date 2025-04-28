import { PatientsAppointmentsRatingsView } from '@/events/appointments/ratings/ui/patients-appointments-ratings-view'

interface PatientsQuestionnairesProps {
  params: { id: string }
}

const PatientsQuestionnairesPage = ({
  params,
}: PatientsQuestionnairesProps) => (
  <PatientsAppointmentsRatingsView appointmentId={params.id} />
)

export default PatientsQuestionnairesPage
