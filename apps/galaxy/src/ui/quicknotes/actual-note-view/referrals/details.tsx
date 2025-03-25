'use client'

import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PatientReferral } from '@/types'
import {
  formatDateTime,
  getCodesetDisplayName,
  getPatientFullName,
} from '@/utils'
import { BlockContainer } from '../shared'

interface Props<T> {
  data: T[]
}

const Details = ({ data }: Props<PatientReferral>) => {
  const codes = useCodesetCodes(CODESETS.ServicesOffered)
  return (
    <BlockContainer heading="Referrals">
      <ScrollArea className="max-h-48 pr-2" scrollbars="vertical">
        {data.map((referral, idx) => (
          <Flex gap="1" direction="column" key={`${referral}-${idx}`}>
            <Text size="1">
              {[
                getCodesetDisplayName(referral.service, codes),
                formatDateTime(referral?.referralDate) ?? 'N/A',
                referral?.appointmentId ?? 'N/A',
                referral?.servicesStatus ?? 'N/A',
                getPatientFullName(referral?.referredByName) ?? 'N/A',
              ].join(' | ')}
            </Text>
          </Flex>
        ))}
      </ScrollArea>
    </BlockContainer>
  )
}

export { Details }
