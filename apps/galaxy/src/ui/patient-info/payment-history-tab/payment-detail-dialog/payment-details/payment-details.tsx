'use client'

import { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PaymentMethod } from '../../types'
import { PaymentDetailSchema } from '../payment-detail-schema'
import { PaymentHistoryDialog } from '../payment-history-dialog'
import { handlePaymentMethodFieldRegistration } from '../utils'
import { AddCardButton } from './add-card-button'
import { CardDetails } from './card-details'
import { CashInput } from './cash-input'
import { CheckNumberInput } from './check-number-input'
import { MakePaymentButton } from './make-payment-button'
import { SelectMethod } from './select-method'
import { TransactionInput } from './transaction-input'

interface PaymentDetailsProps {
  stripeApiKey: string
  patientId: string
}

const PaymentDetails = ({ stripeApiKey, patientId }: PaymentDetailsProps) => {
  const { register, unregister, watch } = useFormContext<PaymentDetailSchema>()

  const paymentMethod = watch('paymentMethod')

  useEffect(() => {
    handlePaymentMethodFieldRegistration(paymentMethod, register, unregister)
  }, [register, unregister, paymentMethod])

  return (
    <Flex direction="column" className="rounded-2 shadow-2" width="100%">
      <Flex
        width="100%"
        justify="between"
        gap="2"
        className="bg-blue-3 px-2 py-0.5"
      >
        <Text size="2" weight="medium">
          Payment Details
        </Text>
        <AddCardButton stripeApiKey={stripeApiKey} patientId={patientId} />
      </Flex>
      <Flex align="start" gap="3" className="px-2 py-2">
        <SelectMethod />
        {renderPaymentDetailInput(paymentMethod)}
        <MakePaymentButton />
        <PaymentHistoryDialog />
      </Flex>
    </Flex>
  )
}

const renderPaymentDetailInput = (paymentMethod: string) => {
  switch (paymentMethod) {
    case PaymentMethod.CMD:
      return <TransactionInput />
    case PaymentMethod.Cheque:
      return <CheckNumberInput />
    case PaymentMethod.Cash:
      return <CashInput />
    case PaymentMethod.CreditCard:
    default:
      return <CardDetails />
  }
}

export { PaymentDetails }
