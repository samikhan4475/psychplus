import { PatientMedicationsView } from '@/ui/medications'

interface PatientMedicationsPageProps {
  params: {
    id: string
  }
}

const PatientMedicationsPage = ({ params }: PatientMedicationsPageProps) => {
  return <PatientMedicationsView patientId={params.id} />
}

export default PatientMedicationsPage
