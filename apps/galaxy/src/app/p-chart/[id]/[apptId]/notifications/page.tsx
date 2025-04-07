import { PatientNotificationsServerView } from '@/ui/notifications'

interface PatientNotificationsVisitViewPageProps {
  params: {
    id: string
    apptId:string
  }
}

const PatientNotificationsVisitViewPage = ({
  params,
}: PatientNotificationsVisitViewPageProps) => {
  return <PatientNotificationsServerView patientId={params.id} />
}

export default PatientNotificationsVisitViewPage
