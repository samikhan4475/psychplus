import { PatientAllergiesView } from '@/ui/allergy'

interface PatientAllergiesVisitViewPageProps {
  params: {
    id: string
    apptId: string
  }
}

const PatientAllergiesVisitViewPage = ({
  params,
}: PatientAllergiesVisitViewPageProps) => {
  return (
    <PatientAllergiesView
      patientId={params.id}
      appointmentId={params.apptId}
      isPatientAllergiesTab={true}
    />
  )
}

export default PatientAllergiesVisitViewPage
