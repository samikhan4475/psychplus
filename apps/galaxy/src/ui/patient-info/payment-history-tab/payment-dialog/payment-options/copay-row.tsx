'use client'

import { Flex } from '@radix-ui/themes'
import { usePaymentTypeField } from '../hooks'
import { PaymentDetailSchemaType } from '../payment-schema'
import { PaymentTypeCheckBox } from '../shared'
import { PaymentType } from '../types'
import { CopayAmountInput } from './copay-amount-input'
import { CopayAppoinmentSelect } from './copay-appoinments-select'

interface CopayRowProps {
  patientId: string
}

const CopayRow = ({ patientId }: CopayRowProps) => {
  const {
    shouldDisable,
    form: { register, unregister },
  } = usePaymentTypeField<PaymentDetailSchemaType>('paymentType')

  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        value={PaymentType.CoPay}
        label="Pay Copay for visit on"
        onCheckedChange={(paymentTypeValues) => {
          if (paymentTypeValues?.includes(PaymentType.CoPay)) {
            register('coPayApp')
            register('coPayAmount')
            return
          }
          unregister('coPayApp')
          unregister('coPayAmount')
        }}
      />
      <Flex gap="2">
        <CopayAppoinmentSelect
          patientId={patientId}
          disabled={shouldDisable(PaymentType.CoPay)}
        />
        <CopayAmountInput />
      </Flex>
    </Flex>
  )
}

export { CopayRow }
