import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@/constants'
import { PatientInfoView } from '@/ui/patient-info'

interface PatientInfoPageProps {
  params: {
    id: string
  }
}

const PatientInfoVisitViewPage = ({ params }: PatientInfoPageProps) => {
  return (
    <PatientInfoView
      patientId={params.id}
      googleApiKey={GOOGLE_MAPS_API_KEY}
      stripeApiKey={STRIPE_PUBLISHABLE_KEY}
    />
  )
}

export default PatientInfoVisitViewPage
