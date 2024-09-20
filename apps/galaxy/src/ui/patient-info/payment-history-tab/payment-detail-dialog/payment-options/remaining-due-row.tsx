'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { usePaymentTypeField } from '../hooks'
import { PaymentDetailSchema } from '../payment-detail-schema'
import { PaymentTypeCheckBox } from '../shared'
import { RemainingDueAmountInput } from './remaining-due-amount-input'

const RemainingDueRow = () => {
  const { shouldDisable, form, paymentTypeValues } =
    usePaymentTypeField<PaymentDetailSchema>('paymentType')

  useEffect(() => {
    if (paymentTypeValues?.includes('outstandingBalance')) {
      form.register('outstandingBalanceAmount')
    } else {
      form.unregister('outstandingBalanceAmount')
    }
  }, [paymentTypeValues])

  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        label="Pay Remaining Due (Balance)"
        value="outstandingBalance"
        disabled={!shouldDisable('customPayment')}
      />
      <RemainingDueAmountInput disabled={shouldDisable('outstandingBalance')} />
    </Flex>
  )
}

export { RemainingDueRow }
