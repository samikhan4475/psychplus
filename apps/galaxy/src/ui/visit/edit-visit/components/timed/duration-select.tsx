'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const DurationDropdown = () => {
  const duration = [
    { label: '20', value: '20' },
    { label: '40', value: '40' },
    { label: '60', value: '60' },
  ]

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Duration</FormFieldLabel>
      <SelectInput
        field="duration"
        options={duration}
        buttonClassName="flex-1 w-full"
      />
      <FormFieldError name="duration" />
    </FormFieldContainer>
  )
}

export { DurationDropdown }
