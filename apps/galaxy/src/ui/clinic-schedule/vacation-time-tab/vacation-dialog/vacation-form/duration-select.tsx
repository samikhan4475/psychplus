'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const DurationSelect = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Duration</FormFieldLabel>
      <SelectInput
        field="duration"
        size="1"
        options={duration}
        buttonClassName="h-6 w-full"
      />
    </FormFieldContainer>
  )
}
const duration = [
  { label: '20', value: '20' },
  { label: '40', value: '40' },
  { label: '60', value: '60' },
]

export { DurationSelect }
