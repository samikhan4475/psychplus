import React from 'react'
import { Text } from '@radix-ui/themes'
import { InsurancePaymentTableTabsProps } from './insurance-payment-table-tabs'
import { PaymentListTypes } from './types'

interface InsPaymentTabButtonProps extends InsurancePaymentTableTabsProps {
  value: PaymentListTypes
}
const InsPaymentTabButton = ({
  value,
  setPaymentListType,
  paymentListType,
}: InsPaymentTabButtonProps) => {
  return (
    <Text
      size="1"
      onClick={() => setPaymentListType(value)}
      className={`inline-block h-fit min-w-[85px]  rounded-2 px-3 py-1 text-center ${paymentListType === value
          ? 'bg-whiteA-1 font-medium shadow-3'
          : 'cursor-pointer'
        } `}
    >
      {value}
    </Text>
  )
}

export { InsPaymentTabButton }
