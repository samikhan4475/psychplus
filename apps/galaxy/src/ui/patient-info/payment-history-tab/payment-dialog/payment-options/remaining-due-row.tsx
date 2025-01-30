'use client'

import { Flex } from '@radix-ui/themes'
import { usePaymentTypeField } from '../hooks'
import { PaymentDetailSchemaType } from '../payment-schema'
import { PaymentTypeCheckBox } from '../shared'
import { PaymentType } from '../types'
import { RemainingDueAmountInput } from './remaining-due-amount-input'

const RemainingDueRow = () => {
  const {
    shouldDisable,
    form: { setValue, watch },
  } = usePaymentTypeField<PaymentDetailSchemaType>('paymentType')

  const remainingBalance = watch('remainingBalance')

  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        label="Pay Remaining Due (Balance)"
        value={PaymentType.OutstandingBalance}
        onCheckedChange={(value) => {
          setValue(
            'outstandingBalanceAmount',
            value?.includes(PaymentType.OutstandingBalance)
              ? remainingBalance
              : '',
          )
        }}
        disabled={!shouldDisable(PaymentType.CustomPayment)}
      />
      <RemainingDueAmountInput
        disabled={shouldDisable(PaymentType.OutstandingBalance)}
      />
    </Flex>
  )
}

export { RemainingDueRow }
