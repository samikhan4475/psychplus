import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { getPatientReferralsAction } from '@/actions'
import { useGenericEventListener } from '@/hooks'
import { PatientReferral } from '@/types'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { capitalizeFirstLetter, formatReadableString } from '@/utils'
import { Details } from '../../referrals/details'
import { getDefaultPayload } from '../../referrals/utils'
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
    label: 'Referral Description',
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
  const [referalsList, setReferalsList] = useState<PatientReferral[]>([])
  const patientId = useParams().id as string

  const refetch = useCallback(() => {
    getPatientReferralsAction({
      patientIds: [patientId],
      payload: getDefaultPayload(),
    }).then((response) => {
      if (response.state === 'error') {
        setReferalsList([])
      } else {
        setReferalsList(response?.data?.referrals ?? [])
      }
    })
  }, [patientId])
  useEffect(() => {
    refetch()
  }, [refetch])

  useGenericEventListener({
    onEventTrigger: refetch,
    eventType: 'widget:save',
    widgetId: QuickNoteSectionName.QuicknoteSectionReferrals,
  })

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
                  {capitalizeFirstLetter(
                    formatReadableString(
                      data[
                        option.detailKey as keyof TmsWidgetSchemaType
                      ] as string,
                    ),
                  )}{' '}
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
          {option.key === 'referral' &&
            data?.dischargePlan?.includes('referral') && (
              <Details data={referalsList} />
            )}
        </Flex>
      ))}
    </Flex>
  )
}

export { DischargePlanSection }
