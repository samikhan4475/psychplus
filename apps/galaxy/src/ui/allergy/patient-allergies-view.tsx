import { Flex } from '@radix-ui/themes'
import { SCRIPTSURE_BASE_APPLICATION_URL } from '@/constants'
import { FeatureFlag } from '@/types/feature-flag'
import { PatientAllergiesWidget } from './patient-allergies-widget'

interface PatientAllergiesViewProps {
  patientId: string
  isPatientAllergiesTab?: boolean
  featureFlags?: FeatureFlag[]
}

const PatientAllergiesView = async ({
  patientId,
  isPatientAllergiesTab,
  featureFlags,
}: PatientAllergiesViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientAllergiesWidget
          patientId={patientId}
          isPatientAllergiesTab={isPatientAllergiesTab}
          scriptSureAppUrl={SCRIPTSURE_BASE_APPLICATION_URL}
          featureFlags={featureFlags}
        />
      </Flex>
    </Flex>
  )
}

export { PatientAllergiesView }
