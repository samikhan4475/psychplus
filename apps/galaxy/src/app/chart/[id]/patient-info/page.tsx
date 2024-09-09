import { PatientInfoView } from '@/ui/patient-info'
import { STRIPE_PUBLISHABLE_KEY } from '@/constants'

interface PatientInfoPageProps {
  params: {
    id: string

  }
}

const PatientInfoPage = ({ params }: PatientInfoPageProps) => {
  return <PatientInfoView patientId={params.id} stripeApiKey={STRIPE_PUBLISHABLE_KEY} />
}

export default PatientInfoPage
