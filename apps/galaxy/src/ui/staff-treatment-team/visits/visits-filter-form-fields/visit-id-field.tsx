'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'

const VisitIdField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Visit ID</FormFieldLabel>
      <NumericInput
        field="appointmentId"
        allowNegative={false}
        prefix=""
        placeholder="Search by Visit ID"
        decimalScale={0}
        maxLimit={Number('9'.repeat(8))}
        containerClassName="w-full"
        className="border-pp-gray-2 h-6 w-[200px] border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { VisitIdField }
