'use client'

import { FormFieldContainer, NumericInput } from '@/components'

const CoInsPaid = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <NumericInput
        field="coInsPaid"
        placeholder="Paid"
        prefix=""
        maxLimit={Infinity}
        allowNegative={false}
      />
    </FormFieldContainer>
  )
}

export { CoInsPaid }
