import { PatientAllergiesView } from '@/ui/allergy'

interface PatientAllergiesPageProps {
  params: {
    id: string
  }
}

const PatientAllergiesPage = ({ params }: PatientAllergiesPageProps) => {
  return <PatientAllergiesView patientId={params.id} />
}

export default PatientAllergiesPage
