'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const SpecialDateSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">Service Date</FormFieldLabel>
      <SelectInput
        field="serviceDate"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="serviceDate" />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Custom',
    value: 'Custom',
  },
  {
    label: 'Primary',
    value: 'primary',
  },
]
export { SpecialDateSelect }
