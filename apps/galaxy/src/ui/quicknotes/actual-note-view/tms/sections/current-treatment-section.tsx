import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { LabelAndValue } from '../../shared'

interface Props<T> {
  data: T
}
const CurrentTreatmentSection = ({ data }: Props<TmsWidgetSchemaType>) => {
  return (
    <Flex direction={'column'} gap={'2'}>
      <Text className="text-2 font-medium">Current Treatment Session:</Text>
      <LabelAndValue
        label="Stimulation Intensity:"
        value={`The optimal stimulation level was defined as (${data.optimalStimulationLevel}%) of Motor Threshold (${data.motorThersholdValue}%) Therefore, the stimulation level of this session was (${data.stimulationLevel}%)`}
      />
      <LabelAndValue label="Stimulation Site:" value={data.stimulationSite} />
      <LabelAndValue label="Coil Type Used:" value={data.coilTypeUsed} />
      <LabelAndValue
        label="Treatment Parameter Adjustments:"
        value={data.treatmentParameter}
      />
      {data.treatmentParameter === 'AdjustmentsMade' && (
        <LabelAndValue label="" value={data.treatmentAdjustmentDetail} />
      )}
    </Flex>
  )
}

export { CurrentTreatmentSection }
