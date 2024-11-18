import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LabelAndValue } from '../../shared'

type ThetaBurstSimulationSectionProps = {
  frequencyOfSessions: string
  noOfPlannedSessions: string
  typeOfThetaBurst: string
  duration: string
  burstPattern: string
}

const ThetaBurstSimulationSection = ({
  frequencyOfSessions,
  noOfPlannedSessions,
  typeOfThetaBurst,
  duration,
  burstPattern,
}: ThetaBurstSimulationSectionProps) => {
  return (
    <Flex direction={'column'} gap="2">
      <Text className="text-1 font-medium">
        Involves bursts of magnetic pulses delivered at a theta frequency (5 Hz)
        typically delivered over the left dorsolateral prefrontal cortex. The
        treatment duration is 3 minutes per session and is typically
        administered daily (five days per week) for several weeks. The intensity
        is adjusted to the patient‘s resting motor threshold.
      </Text>
      <LabelAndValue label="Type of Theta Burst:" value={typeOfThetaBurst} />
      <LabelAndValue label="Duration:" value={duration} />
      <Text className="text-1 font-medium">Stimulation Parameters</Text>
      <LabelAndValue label="Frequency:" value={'Theta Frequency (5 Hz)'} />
      <LabelAndValue label="Burst Pattern:" value={burstPattern} />
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

export { ThetaBurstSimulationSection }
