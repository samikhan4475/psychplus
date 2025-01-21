import { Flex, Text } from '@radix-ui/themes'
import { getFeatureFlagsAction } from '@/actions/get-feature-flag'
import { APP_ENV, SCRIPTSURE_BASE_APPLICATION_URL } from '@/constants'
import { PatientMedicationsWidget } from './patient-medications-widget'

const PatientMedicationsView = async () => {
  const result = await getFeatureFlagsAction({
    recordStatuses: ['Active'],
    exactShortName: 'ehr8973EnableDawMedicationApi',
    environmentCodes: [APP_ENV],
  })

  if (result.state === 'error') {
    return <Text>{result.error}</Text>
  }
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientMedicationsWidget
          scriptSureAppUrl={SCRIPTSURE_BASE_APPLICATION_URL}
          featureFlags={result.data}
        />
      </Flex>
    </Flex>
  )
}

export { PatientMedicationsView }
