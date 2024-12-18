import { PatientAllergiesView } from '@/ui/allergy'

interface PatientAllergiesPageProps {
  params: {
    id: string
  }
}

const PatientAllergiesPage = ({ params }: PatientAllergiesPageProps) => {
  return (
    <PatientAllergiesView patientId={params.id} isPatientAllergiesTab={true} />
  )
}

export default PatientAllergiesPage
