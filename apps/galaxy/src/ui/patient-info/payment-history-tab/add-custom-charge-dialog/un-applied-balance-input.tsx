'use client'

import { FormFieldContainer, FormFieldLabel, NumberInput } from '@/components'

const UnAppliedBalanceInput = () => {
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1">Unapplied Balance</FormFieldLabel>
      <NumberInput
        field="unappliedBalance"
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="$3100.00"
      />
    </FormFieldContainer>
  )
}

export { UnAppliedBalanceInput }
