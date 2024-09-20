'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { usePaymentTypeField } from '../hooks'
import { PaymentDetailSchema } from '../payment-detail-schema'
import { PaymentTypeCheckBox } from '../shared'
import { CoinsuranceAmountInput } from './coinsurance-amount-input'
import { CoinsuranceAppoinmentSelect } from './coinsurance-appoinments-select'

const CoinsuranceRow = () => {
  const { shouldDisable, form, paymentTypeValues } =
    usePaymentTypeField<PaymentDetailSchema>('paymentType')

  useEffect(() => {
    if (paymentTypeValues?.includes('coinsurance')) {
      form.register('coInsApp')
      form.register('coInsAmount')
    } else {
      form.unregister('coInsApp')
      form.unregister('coInsAmount')
    }
  }, [paymentTypeValues])

  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        label="Pay Coinsurance for visit on"
        value="coinsurance"
      />
      <Flex gap="2">
        <CoinsuranceAppoinmentSelect disabled={shouldDisable('coinsurance')} />
        <CoinsuranceAmountInput />
      </Flex>
    </Flex>
  )
}

export { CoinsuranceRow }
