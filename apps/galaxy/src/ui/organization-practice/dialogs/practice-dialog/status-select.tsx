'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const options = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'error', label: 'Error' },
]

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        field="recordStatus"
        options={options}
        placeholder="Select"
        buttonClassName="w-full h-6"
      />
      <FormFieldError name="recordStatus" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
