'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const options = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]
const SignSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Sign</FormFieldLabel>
      <SelectInput
        field="sign"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 w-[72px] h-6 border border-solid !outline-none [box-shadow:none]'
export { SignSelect }
