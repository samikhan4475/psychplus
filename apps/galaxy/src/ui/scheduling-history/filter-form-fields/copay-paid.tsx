'use client'

import { FormFieldContainer, NumericInput } from '@/components'

const CopayPaid = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <NumericInput
        field="coPayPaid"
        placeholder="Paid"
        prefix=""
        maxLimit={Infinity}
        allowNegative={false}
      />
    </FormFieldContainer>
  )
}

export { CopayPaid }
