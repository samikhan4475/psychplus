'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'

const CoInsDue = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Co-Ins</FormFieldLabel>

      <NumericInput
        field="coInsDue"
        placeholder="Due"
        allowNegative={false}
        prefix=""
        maxLimit={Infinity}
      />
    </FormFieldContainer>
  )
}

export { CoInsDue }
