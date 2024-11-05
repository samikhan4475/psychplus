'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'

const UnAppliedBalanceInput = () => {
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1">Unapplied Balance</FormFieldLabel>
      <NumericInput
        placeholder="$0.00"
        field="unappliedBalance"
        disabled
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { UnAppliedBalanceInput }
