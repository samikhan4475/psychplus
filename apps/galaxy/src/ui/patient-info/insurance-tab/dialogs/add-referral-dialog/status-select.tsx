'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Status
      </FormFieldLabel>
      <SelectInput
        field="status"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="status" />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Test',
    value: 'test',
  },
  {
    label: 'Primary',
    value: 'primary',
  },
]
export { StatusSelect }
