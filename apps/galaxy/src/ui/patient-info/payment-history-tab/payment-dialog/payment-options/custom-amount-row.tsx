'use client'

import { Flex } from '@radix-ui/themes'
import { usePaymentTypeField } from '../hooks'
import { PaymentDetailSchemaType } from '../payment-schema'
import { PaymentTypeCheckBox } from '../shared'
import { PaymentType } from '../types'
import { CustomAmountInput } from './custom-amount-input'

const CustomAmountRow = () => {
  const {
    shouldDisable,
    form: { register, unregister },
  } = usePaymentTypeField<PaymentDetailSchemaType>('paymentType')

  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        label="Pay Custom Amount"
        value={PaymentType.CustomPayment}
        onCheckedChange={(paymentTypeValues) => {
          if (paymentTypeValues?.includes(PaymentType.CustomPayment)) {
            register('customAmount')
            return
          }
          unregister('customAmount')
        }}
        disabled={!shouldDisable(PaymentType.OutstandingBalance)}
      />
      <CustomAmountInput disabled={shouldDisable(PaymentType.CustomPayment)} />
    </Flex>
  )
}

export { CustomAmountRow }
