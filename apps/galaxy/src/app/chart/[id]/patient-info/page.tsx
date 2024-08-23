import { PatientInfoView } from '@/ui/patient-info'

interface PatientInfoPageProps {
  params: {
    id: string
  }
}

const PatientInfoPage = ({ params }: PatientInfoPageProps) => {
  return <PatientInfoView patientId={params.id} />
}

export default PatientInfoPage
