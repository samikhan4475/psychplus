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

const PatientInfoVisitViewPage = ({ params }: PatientInfoPageProps) => {
  return (
    <Suspense
      fallback={
        <Flex
          direction="column"
          align="center"
          justify="center"
          flexGrow="1"
          className="h-full"
        >
          <LoadingPlaceholder />
        </Flex>
      }
    >
      <PatientInfoView
        patientId={params.id}
        googleApiKey={GOOGLE_MAPS_API_KEY}
        stripeApiKey={STRIPE_PUBLISHABLE_KEY}
      />
    </Suspense>
  )
}

export default PatientInfoVisitViewPage
