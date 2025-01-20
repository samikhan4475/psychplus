import { Text } from '@radix-ui/themes'
import { getFeatureFlagsAction } from '@/actions/get-feature-flags'
import { APP_ENV } from '@/constants'
import { PharmacyView } from '@/ui/pharmacy'

interface PharmacyPageProps {
  params: {
    id: string
  }
}

const PharmacyPage = async ({ params }: PharmacyPageProps) => {
  const result = await getFeatureFlagsAction({
    recordStatuses: ['Active'],
    exactShortName: 'ehr8973EnableDawMedicationApi',
    environmentCodes: [APP_ENV],
  })

  if (result.state === 'error') {
    return <Text>{result.error}</Text>
  }

  return <PharmacyView patientId={params.id} featureFlags={result.data} />
}

export default PharmacyPage
