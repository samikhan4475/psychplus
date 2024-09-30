'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Status</FormFieldLabel>
      <SelectInput
        field="status"
        placeholder="Select"
        buttonClassName="border-pp-gray-2 w-[159px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={StatusOptions}
      />
      <FormFieldError name="Status" />
    </FormFieldContainer>
  )
}

const StatusOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Pending', label: 'Pending' },
]

export { StatusSelect }
