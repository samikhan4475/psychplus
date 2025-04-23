'use client'

import { Flex } from '@radix-ui/themes'
import { PatientMedicationsWidget } from './patient-medications-widget'

const PatientMedicationsClientLoader = () => {
  return (
    <Flex direction="column" width="100%" gap="2">
      <PatientMedicationsWidget />
    </Flex>
  )
}

export { PatientMedicationsClientLoader }
