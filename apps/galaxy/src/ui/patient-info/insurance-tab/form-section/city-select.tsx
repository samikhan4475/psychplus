'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const CitySelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        City
      </FormFieldLabel>
      <SelectInput
        field="policyHolderCity"
        placeholder="Select city"
        options={options}
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="policyHolderCity" />
    </FormFieldContainer>
  )
}
const options = [
  {
    label: 'Test',
    value: 'test',
  },
]

export { CitySelect }
