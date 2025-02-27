import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LabelAndValue } from '../../shared'

type DTMSProtocolSectionProps = {
  frequencyOfSessions: string
  noOfPlannedSessions: string
  frequency: string
  pulseTrainDuration: string
  interTrainInterval: string
}

const DTMSProtocolSection = ({
  frequencyOfSessions,
  noOfPlannedSessions,
  frequency,
  pulseTrainDuration,
  interTrainInterval,
}: DTMSProtocolSectionProps) => {
  return (
    <Flex direction="column" gap="1">
      <Text className="text-1 font-regular">
        Involves the delivery of repetitive magnetic pulses to stimulate the
        brain. The treatment targets specific regions, such as the prefrontal
        cortex, and is typically administered daily (five days per week) for
        several weeks. The intensity is adjusted to the patient’s resting motor
        threshold.
      </Text>
      <Text className="text-1 font-bold">Stimulation Parameters</Text>
      <LabelAndValue label="Frequency:" value={`${frequency} Hz`} />
      <LabelAndValue
        label="Pulse Train Duration:"
        value={`${pulseTrainDuration} seconds`}
      />
      <LabelAndValue
        label="Inter-Train Interval:"
        value={`${interTrainInterval} seconds`}
      />
      <Text className="text-1 font-bold">Treatment Regime</Text>
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

export { DTMSProtocolSection }
