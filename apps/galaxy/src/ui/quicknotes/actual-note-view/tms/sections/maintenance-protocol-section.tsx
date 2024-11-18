import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LabelAndValue } from '../../shared'

type MaintenanceProtocolSectionProps = {
  frequencyOfSessions: string
  noOfPlannedSessions: string
}
const MaintenanceProtocolSection = ({
  frequencyOfSessions,
  noOfPlannedSessions,
}: MaintenanceProtocolSectionProps) => {
  return (
    <Flex direction={'column'} gap="2">
      <Text className="text-1 font-medium">
        Involves periodic sessions following the completion of an initial
        treatment course, spaced out over an extended period of time depending
        on the patient‘s individual needs and response to treatment.
      </Text>
      <Text className="text-1 font-medium">Treatment Regime</Text>
      <LabelAndValue
        label="Frequency of Sessions:"
        value={frequencyOfSessions}
      />
      <LabelAndValue
        label="No. of Planned Sessions:"
        value={noOfPlannedSessions}
      />
    </Flex>
  )
}

export { MaintenanceProtocolSection }
