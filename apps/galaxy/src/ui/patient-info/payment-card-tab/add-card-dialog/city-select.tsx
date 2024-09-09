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
    value: 'month',
    label: 'Month',
  },
]
const CitySelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel>City</FormFieldLabel>
      <SelectInput
        field="city"
        placeholder="City"
        options={options}
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="city" />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { CitySelect }
