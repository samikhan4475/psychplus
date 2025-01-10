import { Flex } from '@radix-ui/themes'
import { SCRIPTSURE_BASE_APPLICATION_URL } from '@/constants'
import { PatientAllergiesWidget } from './patient-allergies-widget'

interface PatientAllergiesViewProps {
  patientId: string
  isPatientAllergiesTab?: boolean
}

const PatientAllergiesView = async ({
  patientId,
  isPatientAllergiesTab,
}: PatientAllergiesViewProps) => {
  // Added this for logging Purpose Will Remove after testing
  console.log(
    'SCRIPTSURE_BASE_APPLICATION_URL',
    SCRIPTSURE_BASE_APPLICATION_URL,
  )

  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientAllergiesWidget
          patientId={patientId}
          isPatientAllergiesTab={isPatientAllergiesTab}
          scriptSureAppUrl={SCRIPTSURE_BASE_APPLICATION_URL}
        />
      </Flex>
    </Flex>
  )
}

export { PatientAllergiesView }
