'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'

const BalanceDue = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Balance</FormFieldLabel>
      <NumericInput
        field="balanceDue"
        placeholder="Due"
        prefix=""
        maxLimit={Infinity}
        allowNegative={false}
      />
    </FormFieldContainer>
  )
}

export { BalanceDue }
