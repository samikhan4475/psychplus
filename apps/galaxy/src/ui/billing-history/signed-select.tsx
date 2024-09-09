'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const options = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]
const SignedSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Signed</FormFieldLabel>
      <SelectInput
        placeholder="Select "
        field="signed"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 w-[122px] h-6 border border-solid !outline-none [box-shadow:none]'
export { SignedSelect }
