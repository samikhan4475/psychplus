'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useStore } from '@/ui/procedures/store'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'

interface Props<T> {
  data: T
}

function interpretScore(score: number) {
  if (score >= 0 && score <= 7) return 'Subclinical Range'
  if (score >= 8 && score <= 15) return 'Mild'
  if (score >= 16 && score <= 23) return 'Moderate'
  if (score >= 24 && score <= 31) return 'Severe'
  if (score >= 32 && score <= 40) return 'Extreme'
  return ''
}

const TreatmentObservationSection = ({ data }: Props<TmsWidgetSchemaType>) => {
  const { phq9Score } = useStore((state) => ({
    phq9Score: state.phq9Score,
  }))
  return (
    <Flex direction={'column'}>
      <Text className="mt-2 text-2 font-medium">
        Treatment Observation & Patient Response:
      </Text>
      <Text className="text-1 font-medium">{data.treatmentAndObservation}</Text>
      <Text className="mt-2 text-2 font-medium">Today’s PHQ 9:</Text>
      <Text className=" text-1 font-medium">
        Score Interpretation | 0-7 - Subclinical Range | 8-15 - Mild | 16-23 -
        Moderate | 24-31 - Severe | 32-40 - Extreme
      </Text>
      <Text className="mb-1 text-1 font-medium">
        Score {phq9Score} |
        {phq9Score !== '' ? interpretScore(Number(phq9Score)) : ''}
      </Text>
    </Flex>
  )
}

export { TreatmentObservationSection }
