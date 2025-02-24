import { Flex } from '@radix-ui/themes'
import { PatientMedicationsWidget } from './patient-medications-widget'

const PatientMedicationsView = async () => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientMedicationsWidget />
      </Flex>
    </Flex>
  )
}

export { PatientMedicationsView }
