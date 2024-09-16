'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const ProviderSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1 ">Provider</FormFieldLabel>
      <SelectInput
        field="provider"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="provider" />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Dr. John Smith',
    value: 'Dr. John Smith',
  },
  {
    label: 'Primary',
    value: 'primary',
  },
]
export { ProviderSelect }
