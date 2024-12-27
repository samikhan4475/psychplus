'use client'

import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { PatientReferral } from '@/types'
import { formatDateTime, getPatientFullName } from '@/utils'
import { BlockContainer } from '../shared'

interface Props<T> {
  data: T[]
}

const Details = ({ data }: Props<PatientReferral>) => {
  return (
    <BlockContainer heading="Referrals">
      <ScrollArea className="max-h-48 pr-2" scrollbars="vertical">
        <Flex gap="1" direction="column">
          {data.map((referral, idx) => (
            <Text size="1" key={`${referral}-${idx}`}>
              {[
                referral?.service,
                formatDateTime(referral?.referralDate) ?? 'N/A',
                referral?.appointmentId ?? 'N/A',
                referral?.servicesStatus ?? 'N/A',
                referral?.metadata?.createdByFullName ?? 'N/A',
                referral?.referredByName
                  ? getPatientFullName(referral?.referredByName)
                  : 'N/A',
              ].join(' | ')}
            </Text>
          ))}
        </Flex>
      </ScrollArea>
    </BlockContainer>
  )
}

export { Details }
