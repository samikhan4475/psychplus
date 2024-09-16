'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const VisitType = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Visit Type
      </FormFieldLabel>
      <SelectInput
        field="visitType"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="visitType" />
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
export { VisitType }
