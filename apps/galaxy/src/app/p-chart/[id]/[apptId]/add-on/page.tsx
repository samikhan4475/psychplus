import { AddOnWidget } from '@/ui/add-on'

interface PatientAddOnVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
  searchParams: {
    id: string
    visitType: string
    visitSequence: string
  }
}

const PatientAddOnVisitViewPage = ({
  params,
  searchParams,
}: PatientAddOnVisitViewPageProps) => {
  return (
    <AddOnWidget
      patientId={params.id}
      appointmentId={searchParams.id}
      visitType={searchParams.visitType}
      visitSequence={searchParams.visitSequence}
    />
  )
}

export default PatientAddOnVisitViewPage
