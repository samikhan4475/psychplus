import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { Claim } from '@/types'
import { ClaimProcessedSelect } from './claim-processed-select'
import { ClaimStatusSelect } from './claim-status-select'
import { ClaimSummaryCard } from './claim-summary-card'

interface InsurancePaymentClaimSummaryProps {
  claim?: Partial<Claim>
}
const InsurancePaymentClaimSummary = ({
  claim,
}: InsurancePaymentClaimSummaryProps) => {
  return (
    <Flex gapX="8" align="center" width="100%">
      <Flex direction="column">
        <Flex mb="2" justify="between" align="center">
          <Text mb="1" size="3" weight="bold">
            Claim Summary
          </Text>
          <ClaimStatusSelect />
        </Flex>
        <Flex gapX="3">
          <ClaimSummaryCard label="Claim Total" value={claim?.totalAmount} />
          <ClaimSummaryCard label="Claim Balance" value={claim?.amountDue} />
          <ClaimSummaryCard label="Primary Paid" value={claim?.primaryPaid} />
          <ClaimSummaryCard
            label="Secondary Paid"
            value={claim?.secondaryPaid}
          />
          <ClaimSummaryCard label="Tertiary Paid" value={claim?.tertiaryPaid} />
          <ClaimSummaryCard label="Patient Paid" value={claim?.patientPaid} />
        </Flex>
      </Flex>
      <ClaimProcessedSelect />
    </Flex>
  )
}

export { InsurancePaymentClaimSummary }
