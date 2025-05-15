'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const VisitTypeDropdown = () => {
  const options = useCodesetOptions(CODESETS.VisitType)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitType"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[200px]'
export { VisitTypeDropdown }
