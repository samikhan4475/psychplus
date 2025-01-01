'use client'

import { Flex } from '@radix-ui/themes'
import { usePaymentTypeField } from '../hooks'
import { PaymentDetailSchemaType } from '../payment-schema'
import { PaymentTypeCheckBox } from '../shared'
import { PaymentType } from '../types'
import { CoinsuranceAmountInput } from './coinsurance-amount-input'
import { CoinsuranceAppoinmentSelect } from './coinsurance-appoinments-select'

interface CoInsuranceRowProps {
  patientId: string
  appointmentId?: number
}

const CoInsuranceRow = ({ patientId, appointmentId }: CoInsuranceRowProps) => {
  const {
    shouldDisable,
    form: { register, unregister },
  } = usePaymentTypeField<PaymentDetailSchemaType>('paymentType')

  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        label="Pay Coinsurance for visit on"
        value={PaymentType.CoIns}
        onCheckedChange={(paymentTypeValues) => {
          if (paymentTypeValues?.includes(PaymentType.CoIns)) {
            register('coInsApp')
            register('coInsAmount')
            return
          }
          unregister('coInsApp')
          unregister('coInsAmount')
        }}
      />
      <Flex gap="2">
        <CoinsuranceAppoinmentSelect
          patientId={patientId}
          appointmentId={appointmentId}
          disabled={shouldDisable(PaymentType.CoIns)}
        />
        <CoinsuranceAmountInput />
      </Flex>
    </Flex>
  )
}

export { CoInsuranceRow }
