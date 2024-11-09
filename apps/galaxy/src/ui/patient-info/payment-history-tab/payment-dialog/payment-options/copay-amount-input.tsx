'use client'

import { FormFieldContainer, NumericInput } from '@/components'

const CopayAmountInput = () => {
  return (
    <FormFieldContainer>
      <NumericInput
        placeholder="$0.00"
        field="coPayAmount"
        className="border-pp-gray-2 !h-6 w-24 border border-solid outline-none [box-shadow:none]"
        disabled={true}
        decimalScale={2}
        prefix={'$'}
      />
    </FormFieldContainer>
  )
}

export { CopayAmountInput }
