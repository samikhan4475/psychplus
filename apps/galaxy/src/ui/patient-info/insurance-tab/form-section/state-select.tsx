'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const StateSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        State
      </FormFieldLabel>
      <SelectInput
        field="policyHolderState"
        placeholder="Select state"
        options={options}
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="policyHolderState" />
    </FormFieldContainer>
  )
}
const options = [
  {
    label: 'Test',
    value: 'test',
  },
]

export { StateSelect }
