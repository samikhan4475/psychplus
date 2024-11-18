import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { BlockContainer, LabelAndValue } from '../../shared'

interface Props<T> {
  data: T
}

const monitoringSectionList = [
  {
    labe: 'Seizure:',
    key: 'tmsSeizureBlock',
    detailsKey: 'tmsSeizureBlockDetail',
  },
  {
    labe: 'Headache:',
    key: 'tmsHeadacheBlock',
    detailsKey: 'tmsHeadacheBlockDetail',
  },
  {
    labe: 'Fatigue:',
    key: 'Fatigue',
    detailsKey: 'tmsFatigueBlockDetail',
  },
  {
    labe: 'Scalp Discomfort:',
    key: 'tmsScalpDiscomfortBlock',
    detailsKey: 'tmsScalpDiscomfortBlockDetail',
  },
  {
    labe: 'Muscle Twitching:',
    key: 'tmsMuscleTwitchingBlock',
    detailsKey: 'tmsMuscleTwitchingBlockDetail',
  },
  {
    labe: 'Dizziness:',
    key: 'tmsDizzinessBlock',
    detailsKey: 'tmsDizzinessBlockDetail',
  },
  {
    labe: 'Other:',
    key: 'tmsOtherBlock',
    detailsKey: 'tmsOtherBlockDetail',
  },
  {
    labe: 'Did the patient experience any suicidal ideations during treatment or since the last treatment session?',
    key: 'suicide',
  },
]

const MonitoringSection = ({ data }: Props<TmsWidgetSchemaType>) => {
  return (
    <BlockContainer heading="Monitoring">
      <Text className="text-2 font-medium">
        Side Effects & Adverse Reactions
      </Text>
      <Text className="text-1 font-medium">
        Did the Patient experience any of the following adverse reactions or
        side effects?
      </Text>
      <Flex direction={'column'} gap={'2'}>
        {monitoringSectionList.map((option) => (
          <Flex direction={'column'} key={option.key}>
            <LabelAndValue
              label={option.labe}
              value={data[option.key as keyof TmsWidgetSchemaType] as string}
            />
            {data[option.key as keyof TmsWidgetSchemaType] === 'yes' && (
              <Text>
                {data[option.detailsKey as keyof TmsWidgetSchemaType] as string}
              </Text>
            )}
          </Flex>
        ))}
      </Flex>
    </BlockContainer>
  )
}

export { MonitoringSection }
