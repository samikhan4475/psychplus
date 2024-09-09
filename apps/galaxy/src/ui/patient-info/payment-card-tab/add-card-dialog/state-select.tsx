'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const options = [
  {
    value: 'test',
    label: 'Test',
  },
  {
    value: 'year',
    label: 'Year',
  },
]
const StateSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel>State</FormFieldLabel>
      <SelectInput
        field="state"
        placeholder="State"
        options={options}
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="state" />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { StateSelect }
