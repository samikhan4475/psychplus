import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@/constants'
import { PatientInfoView } from '@/ui/patient-info'

interface PatientInfoPageProps {
  params: {
    id: string
  }
}

const PatientInfoPage = ({ params }: PatientInfoPageProps) => {
  return (
    <PatientInfoView
      googleApiKey={GOOGLE_MAPS_API_KEY}
      patientId={params.id}
      stripeApiKey={STRIPE_PUBLISHABLE_KEY}
    />
  )
}

export default PatientInfoPage
