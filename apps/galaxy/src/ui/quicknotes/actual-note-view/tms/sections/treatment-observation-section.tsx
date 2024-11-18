import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'

interface Props<T> {
  data: T
}

const TreatmentObservationSection = ({ data }: Props<TmsWidgetSchemaType>) => {
  return (
    <Flex direction={'column'}>
      <Text className="mt-2 text-2 font-medium">
        Treatment Observation & Patient Response:
      </Text>
      <Text className="text-1 font-medium">{data.treatmentAndObservation}</Text>
      <Text className="mt-2 text-2 font-medium">Today’s PHQ 9:</Text>
      <Text className="mb-1 text-1 font-medium">
        Score Interpretation | 0-7 - Subclinical Range | 8-15 - Mild | 16-23 -
        Moderate | 24-31 - Severe | 32-40 - Extreme Score 12 | Mild
      </Text>
    </Flex>
  )
}

export { TreatmentObservationSection }
