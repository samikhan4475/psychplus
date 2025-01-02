'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'

const CoPayDue = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Co-Pay</FormFieldLabel>
      <NumericInput
        field="coPayDue"
        placeholder="Due"
        prefix=""
        maxLimit={Infinity}
        allowNegative={false}
      />
    </FormFieldContainer>
  )
}

export { CoPayDue }
