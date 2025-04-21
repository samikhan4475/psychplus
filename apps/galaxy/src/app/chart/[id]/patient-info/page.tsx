import { Suspense } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
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
      patientId={params.id}
      googleApiKey={GOOGLE_MAPS_API_KEY}
      stripeApiKey={STRIPE_PUBLISHABLE_KEY}
    />
  )
}

export default PatientInfoPage
