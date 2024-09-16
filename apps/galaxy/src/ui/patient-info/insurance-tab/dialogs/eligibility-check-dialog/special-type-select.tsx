'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const SpecialTypeSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">Service Type</FormFieldLabel>
      <SelectInput
        field="serviceType"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="serviceType" />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Psych Therapy',
    value: 'Psych Therapy',
  },
  {
    label: 'Primary',
    value: 'primary',
  },
]
export { SpecialTypeSelect }
