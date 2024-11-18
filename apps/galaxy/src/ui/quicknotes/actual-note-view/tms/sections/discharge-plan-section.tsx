import React from 'react'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { LabelAndValue } from '../../shared'

interface Props<T> {
  data: T
}

const dischargePlanSectionList = [
  {
    label: 'Continue with Current Protocol',
    key: 'continueWithCurrentProtocol',
  },
  {
    label: 'Modify Treatment Plan',
    key: 'modifyTreatmentPlan',
    detailKey: 'modifyTreatmentPlanDetail',
  },
  {
    label: 'Discontinue Treatment',
    key: 'discontinueTreatment',
    detailKey: 'discontinueTreatmentDetail',
  },
  {
    label: 'Referral',
    key: 'referral',
    detailKey: 'referralDetail',
  },
  {
    label: 'Follow-up Assessment Screening',
    key: 'followupAssessmentScreening',
    detailKey: 'followUpBlock',
  },
]

const DischargePlanSection = ({ data }: Props<TmsWidgetSchemaType>) => {
  return (
    <Flex direction={'column'} gap={'2'}>
      <Heading size="3" className="my-1">
        Discharge Plan
      </Heading>
      {dischargePlanSectionList.map((option) => (
        <Flex direction={'column'} key={option.key}>
          {data.dischargePlan.includes(option.key) && (
            <>
              <LabelAndValue label={option.label + ':'} value={'Selected'} />
              {option.detailKey && option.key === 'modifyTreatmentPlan' ? (
                <Text className="text-1 font-medium">
                  Treatment plan will be modified to begin the{' '}
                  {
                    data[
                      option.detailKey as keyof TmsWidgetSchemaType
                    ] as string
                  }
                  Protocol.
                </Text>
              ) : (
                option.detailKey && (
                  <Text className="text-1 font-medium">
                    {data[
                      option.detailKey as keyof TmsWidgetSchemaType
                    ].toString()}
                  </Text>
                )
              )}
            </>
          )}
        </Flex>
      ))}
    </Flex>
  )
}

export { DischargePlanSection }
