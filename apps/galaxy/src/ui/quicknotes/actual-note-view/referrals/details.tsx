'use client'

import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral, SelectOptionType } from '@/types'
import { DISABLE_CODESET_ATTRIBUTE } from '@/ui/int-referrals/constants'
import { formatDateTime, getPatientFullName } from '@/utils'
import { BlockContainer } from '../shared'

interface Props<T> {
  data: T[]
}

const Details = ({ data }: Props<PatientReferral>) => {
  const options = useCodesetOptions(CODESETS.ServicesOffered, '', [
    CODE_NOT_SET,
  ])
  const contactStatusOptions = useCodesetOptions(
    CODESETS.ContactMadeStatus,
    DISABLE_CODESET_ATTRIBUTE,
  )
  const referalStatusOption = useCodesetOptions(CODESETS.ResourceStatus)

  const getServiceLabel = (options: SelectOptionType[], value: string) =>
    options?.find((option) => option.value === value)?.label

  return (
    <BlockContainer heading="Referrals">
      <ScrollArea className="max-h-48 pr-2" scrollbars="vertical">
        {data.map((referral, idx) => (
          <Flex gap="1" direction="column" key={`${referral}-${idx}`}>
            <Text size="1">
              {[
                getServiceLabel(options, referral.service),
                formatDateTime(referral?.referralDate) ?? 'N/A',
                referral?.appointmentId ?? 'N/A',
                referral?.servicesStatus ?? 'N/A',
                referral?.intiatedByUserRole ?? 'N/A',
                referral?.referredByName
                  ? getPatientFullName(referral?.referredByName)
                  : 'N/A',
                contactStatusOptions.filter(
                  (option) => option.value === referral?.contactStatus,
                )[0]?.label ?? 'N/A',
                referalStatusOption.filter(
                  (option) => option.value === referral?.resourceStatus,
                )[0]?.label ?? 'N/A',
                formatDateTime(referral?.nextVisit) ?? 'N/A',
                formatDateTime(referral?.patientVisitHistory) ?? 'N/A',
                referral?.comments ?? 'N/A',
              ].join(' | ')}
            </Text>
          </Flex>
        ))}
      </ScrollArea>
    </BlockContainer>
  )
}

export { Details }
