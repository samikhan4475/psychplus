'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { usePaymentTypeField } from '../hooks'
import { PaymentDetailSchema } from '../payment-detail-schema'
import { PaymentTypeCheckBox } from '../shared'
import { CustomAmountInput } from './custom-amount-input'

const CustomAmountRow = () => {
  const { shouldDisable, paymentTypeValues, form } =
    usePaymentTypeField<PaymentDetailSchema>('paymentType')

  useEffect(() => {
    if (!paymentTypeValues?.includes('customPayment')) {
      form.unregister('customAmount')
    } else {
      form.register('customAmount')
    }
  }, [paymentTypeValues])

  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        label="Pay Custom Amount"
        value="customPayment"
        disabled={!shouldDisable('outstandingBalance')}
      />
      <CustomAmountInput disabled={shouldDisable('customPayment')} />
    </Flex>
  )
}

export { CustomAmountRow }
