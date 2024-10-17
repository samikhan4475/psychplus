import React from 'react'
import { Flex } from '@radix-ui/themes'
import { InsPaymentTabButton } from './insurance-payment-table-tab-button'
import { PaymentListTypes } from './types'

const InsurancePaymentTableTabs = () => {
  return (
    <Flex className="mb-2 w-fit rounded-l-3 rounded-r-3 bg-gray-2 p-1">
      <InsPaymentTabButton value={PaymentListTypes.All} />
      <InsPaymentTabButton value={PaymentListTypes.Posted} />
      <InsPaymentTabButton value={PaymentListTypes.Unposted} />
      <InsPaymentTabButton value={PaymentListTypes.Unlinked} />
    </Flex>
  )
}

export { InsurancePaymentTableTabs }
