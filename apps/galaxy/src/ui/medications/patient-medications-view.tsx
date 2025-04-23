import { Flex } from '@radix-ui/themes'
import { PatientMedicationsWidget } from './patient-medications-widget'

const PatientMedicationsView = async () => {
  return (
    <Flex direction="column" width="100%" gap="2">
      <PatientMedicationsWidget />
    </Flex>
  )
}

export { PatientMedicationsView }
