'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const TestLocationInput = () => {
  return (
    <FormFieldContainer className="flex flex-col gap-0.5">
      <FormFieldLabel required>Test Location</FormFieldLabel>
      <SelectInput
        field="isTestLocation"
        options={options}
        size="1"
        buttonClassName="w-full h-6"
      />
      <FormFieldError name="isTestLocation" />
    </FormFieldContainer>
  )
}

const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

export { TestLocationInput }
