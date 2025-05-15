'use client'

import { FormFieldContainer, FormFieldLabel, NumericInput } from '@/components'

const SearchByMRNField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>MRN</FormFieldLabel>
      <NumericInput
        field="patientId"
        allowNegative={false}
        prefix=""
        placeholder="Search by MRN"
        decimalScale={0}
        maxLimit={Number('9'.repeat(8))}
        containerClassName="w-full"
        className="border-pp-gray-2 h-6 w-[200px] border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { SearchByMRNField }
