import { Flex } from '@radix-ui/themes'
import { SCRIPTSURE_BASE_APPLICATION_URL } from '@/constants'
import { PatientMedicationsWidget } from './patient-medications-widget'

const PatientMedicationsView = () => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientMedicationsWidget
          scriptSureAppUrl={SCRIPTSURE_BASE_APPLICATION_URL}
        />
      </Flex>
    </Flex>
  )
}

export { PatientMedicationsView }
