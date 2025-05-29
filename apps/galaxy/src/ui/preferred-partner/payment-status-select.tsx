'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const PaymentStatusSelect = () => {
  const paymentOptions = useCodesetOptions(CODESETS.PaymentStatus)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Payment Status</FormFieldLabel>
      <DropdownSelect
        field="paymentStatuses[0]"
        options={paymentOptions}
        buttonClassName="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PaymentStatusSelect }
