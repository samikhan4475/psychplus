import { PatientAllergiesView } from '@/ui/allergy'

interface PatientAllergiesPageProps {
  params: {
    id: string
  }
}

const PatientAllergiesPage = async ({ params }: PatientAllergiesPageProps) => {
  // TODO: TBD with pmo
  return (
    <PatientAllergiesView patientId={params.id} isPatientAllergiesTab={true} />
  )
}

export default PatientAllergiesPage
