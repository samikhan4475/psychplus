'use client'

import { FormFieldContainer, FormFieldError, NumberInput } from '@/components'

const PaymentPlanInput = () => {
  return (
    <FormFieldContainer>
      <NumberInput
        placeholder="$0.00"
        field="paymentPlanAmount"
        className="border-pp-gray-2 !h-6 w-[50px] border border-solid outline-none [box-shadow:none]"
        disabled={true}
      />
      <FormFieldError name="paymentPlanAmount" />
    </FormFieldContainer>
  )
}

export { PaymentPlanInput }
