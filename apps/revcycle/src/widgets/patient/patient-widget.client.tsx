'use client'

import { Flex, Text } from '@radix-ui/themes'
import { usePatient } from '@psychplus/patient'
import { useStore } from './store'

const PatientWidgetClient = () => {
  const patient = usePatient(useStore)

  return (
    <Flex direction="column" height="100%" width="100%">
      <Text>
        This example widget will fetch and display the patient&apos;s name.
      </Text>
      <Text>
        <b>Patient:</b> {patient.fullName}
      </Text>
    </Flex>
  )
}

export { PatientWidgetClient }
