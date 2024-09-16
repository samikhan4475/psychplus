'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const SelectType = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Type
      </FormFieldLabel>
      <SelectInput
        field="type"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="type" />
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
export { SelectType }
