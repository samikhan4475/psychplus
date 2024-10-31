import React, { Dispatch, SetStateAction } from 'react'
import { Flex } from '@radix-ui/themes'
import { InsPaymentTabButton } from './insurance-payment-table-tab-button'
import { PaymentListTypes } from './types'


interface InsurancePaymentTableTabsProps {
  paymentListType: PaymentListTypes
  setPaymentListType: Dispatch<SetStateAction<PaymentListTypes>>
}
const InsurancePaymentTableTabs = ({ ...props }: InsurancePaymentTableTabsProps) => {
  return (
    <Flex className="mb-2 w-fit rounded-l-3 rounded-r-3 bg-gray-2 p-1">
      <InsPaymentTabButton {...props} value={PaymentListTypes.All} />
      <InsPaymentTabButton {...props} value={PaymentListTypes.Posted} />
      <InsPaymentTabButton {...props} value={PaymentListTypes.Unposted} />
      <InsPaymentTabButton {...props} value={PaymentListTypes.Unlinked} />
    </Flex>
  )
}

export { InsurancePaymentTableTabs, type InsurancePaymentTableTabsProps }
