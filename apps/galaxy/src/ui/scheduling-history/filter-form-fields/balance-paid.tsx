'use client'

import { FormFieldContainer, NumericInput } from '@/components'

const BalancePaid = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <NumericInput
        field="balancePaid"
        placeholder="Paid"
        prefix=""
        maxLimit={Infinity}
        allowNegative={false}
      />
    </FormFieldContainer>
  )
}

export { BalancePaid }
