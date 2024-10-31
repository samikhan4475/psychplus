'use client'

import { Flex, Text } from '@radix-ui/themes'
import { AddVitalsButton } from './buttons'
import { VitalsTabsList } from './tabs'
import { VitalsProps } from './types'

const VitalsHeader = ({ patientId, appointmentId }: VitalsProps) => {
  return (
    <Flex
      align="center"
      className="p-2.5 drop-shadow [box-shadow:0_4px_4px_0_#00000014]"
      justify="between"
    >
      <Flex gap="2" align="center">
        <Text className="text-[16px] font-[600] text-accent-12">Vitals</Text>
        <VitalsTabsList />
      </Flex>

      <Flex>
        <AddVitalsButton
          title="Add Vitals"
          patientId={patientId}
          appointmentId={appointmentId}
        />
      </Flex>
    </Flex>
  )
}

export { VitalsHeader }
