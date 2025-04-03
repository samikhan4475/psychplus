import { PatientNotificationsServerView } from '@/ui/notifications'

interface PatientNotificationsPageProps {
  params: {
    id: string
  }
}

const PatientNotificationsPage = ({
  params,
}: PatientNotificationsPageProps) => {
  return <PatientNotificationsServerView patientId={params.id} />
}

export default PatientNotificationsPage
