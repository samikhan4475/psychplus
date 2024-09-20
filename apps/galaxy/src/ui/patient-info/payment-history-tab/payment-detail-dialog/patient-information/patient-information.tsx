'use client'

import { Flex, Text } from '@radix-ui/themes'
import { PatientInfoDetail } from './patient-info-detail'

const PatientInformation = () => {
  return (
    <Flex direction="column" className="rounded-2 shadow-2">
      <Text className="bg-blue-3 px-2 py-0.5" size="2" weight="medium">
        Patient Information
      </Text>
      <PatientInfoDetail />
    </Flex>
  )
}

export { PatientInformation }
