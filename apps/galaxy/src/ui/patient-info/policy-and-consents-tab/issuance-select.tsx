'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const IssuanceSelect = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Issuance Date</FormFieldLabel>
      <SelectInput
        field="Status"
        placeholder="Select"
        buttonClassName={buttonClassName}
      />
    </FormFieldContainer>
  )
}
export { IssuanceSelect }
const buttonClassName =
  'border-pp-gray-2 w-[143px] h-6 border border-solid !outline-none [box-shadow:none]'
