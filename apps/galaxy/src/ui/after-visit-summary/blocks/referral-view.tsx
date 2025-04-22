'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { PatientReferral } from '@/types'
import { ReferralTable } from './referral-table'

interface ReferralViewProps {
  referrals: PatientReferral[]
}

function ReferralView({ referrals }: ReferralViewProps) {
  return (
    <Flex
      direction="column"
      gap="1"
      className="bg-white my-2 rounded-1 p-2 pb-0"
    >
      <Text className="text-[16px] font-[600] text-accent-12">
        {'Referral'}
      </Text>
      <ReferralTable referrals={referrals} />
    </Flex>
  )
}

export { ReferralView }
