import React from 'react'
import { Flex } from '@radix-ui/themes'
import { InsurancePaymentClaimSummary } from './insurance-payment-claim-summary'
import { InsurancePaymentPostingTable } from './insurance-payment-posting-table'

const InsurancePaymentPostingView = () => {
  return (
    <Flex gapY="4" direction="column">
      <InsurancePaymentClaimSummary />
      <InsurancePaymentPostingTable />
    </Flex>
  )
}

export { InsurancePaymentPostingView }
