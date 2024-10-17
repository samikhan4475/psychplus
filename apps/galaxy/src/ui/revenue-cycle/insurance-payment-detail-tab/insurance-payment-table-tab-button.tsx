import React from 'react'
import { Text } from '@radix-ui/themes'
import { useStore } from './store'
import { PaymentListTypes } from './types'

interface InsPaymentTabButtonProps {
  value: PaymentListTypes
}
const InsPaymentTabButton = ({ value }: InsPaymentTabButtonProps) => {
  const { paymentListType, setPaymentListType } = useStore((state) => ({
    paymentListType: state.paymentListType,
    setPaymentListType: state.setPaymentListType,
  }))
  return (
    <Text
      size="1"
      onClick={() => setPaymentListType(value)}
      className={`inline-block h-fit min-w-[85px]  rounded-2 px-3 py-1 text-center ${
        paymentListType === value
          ? 'bg-whiteA-1 font-medium shadow-3'
          : 'cursor-pointer'
      } `}
    >
      {value}
    </Text>
  )
}

export { InsPaymentTabButton }
