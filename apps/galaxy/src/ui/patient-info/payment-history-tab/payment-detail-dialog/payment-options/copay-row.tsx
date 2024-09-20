'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { usePaymentTypeField } from '../hooks'
import { PaymentDetailSchema } from '../payment-detail-schema'
import { PaymentTypeCheckBox } from '../shared'
import { CopayAmountInput } from './copay-amount-input'
import { CopayAppoinmentSelect } from './copay-appoinments-select'

const CopayRow = () => {
  const { shouldDisable, form, paymentTypeValues } =
    usePaymentTypeField<PaymentDetailSchema>('paymentType')

  useEffect(() => {
    if (paymentTypeValues?.includes('copay')) {
      form.register('coPayApp')
      form.register('coPayAmount')
    } else {
      form.unregister('coPayApp')
      form.unregister('coPayAmount')
    }
  }, [paymentTypeValues])

  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        value="copay"
        label="Pay Copay for visit on"
      />
      <Flex gap="2">
        <CopayAppoinmentSelect disabled={shouldDisable('copay')} />
        <CopayAmountInput />
      </Flex>
    </Flex>
  )
}

export { CopayRow }
