'use client'

import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { Claim } from '@/types'
import { getClaimById } from '../../claim-detail-tab/actions'
import { ClaimProcessedSelect } from './claim-processed-select'
import { ClaimStatus } from './claim-status'
import { ClaimSummaryCard } from './claim-summary-card'

interface InsurancePaymentClaimSummaryProps {
  claim?: Partial<Claim>
}

interface ClaimHeaderInfo {
  totalAmount?: number
  amountDue?: number
  primaryPaid?: number
  tertiaryPaid?: number
  patientPaid?: number
  secondaryPaid?: number
}

const InsurancePaymentClaimSummary = ({
  claim,
}: InsurancePaymentClaimSummaryProps) => {
  const [headerInfo, setHeaderInfo] = useState<ClaimHeaderInfo>({
    totalAmount: claim?.totalAmount,
    amountDue: claim?.amountDue,
    primaryPaid: claim?.primaryPaid,
    tertiaryPaid: claim?.tertiaryPaid,
    patientPaid: claim?.patientPaid,
    secondaryPaid: claim?.secondaryPaid,
  })
  useEffect(() => {
    ;(async () => {
      if (claim?.claimId) {
        const result = await getClaimById(claim?.claimId)
        if (result.state === 'success') {
          setHeaderInfo(result.data)
        } else if (result.state === 'error') {
          toast.error(result.error)
        }
      }
    })()
  }, [claim?.claimId])
  return (
    <Flex gapX="8" align="center" width="100%">
      <Flex direction="column">
        <Flex mb="2" justify="between" align="center">
          <Text mb="1" size="3" weight="bold">
            Claim Summary
          </Text>
          <ClaimStatus />
        </Flex>
        <Flex gapX="3">
          <ClaimSummaryCard
            label="Claim Total"
            value={headerInfo.totalAmount}
          />
          <ClaimSummaryCard
            label="Claim Balance"
            value={headerInfo.amountDue}
          />
          <ClaimSummaryCard
            label="Primary Paid"
            value={headerInfo.primaryPaid}
          />
          <ClaimSummaryCard
            label="Secondary Paid"
            value={headerInfo.secondaryPaid}
          />
          <ClaimSummaryCard
            label="Tertiary Paid"
            value={headerInfo.tertiaryPaid}
          />
          <ClaimSummaryCard
            label="Patient Paid"
            value={headerInfo.patientPaid}
          />
        </Flex>
      </Flex>
      <ClaimProcessedSelect />
    </Flex>
  )
}

export { InsurancePaymentClaimSummary }
