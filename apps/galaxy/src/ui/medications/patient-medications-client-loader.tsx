'use client'

import { Flex } from '@radix-ui/themes'
import { PatientMedicationsWidget } from './patient-medications-widget'
import { useStore } from '@/store'

const PatientMedicationsClientLoader = () => {
  const { constant } = useStore((state) => ({
    constant: state.constants,
  }))
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientMedicationsWidget
          scriptSureAppUrl={constant.scriptsureBaseApplicationUrl}
        />
      </Flex>
    </Flex>
  )
}

export { PatientMedicationsClientLoader }
