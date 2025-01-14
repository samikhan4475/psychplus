'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const LocationSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0.5">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput options={[]} buttonClassName="h-6 w-full" field="location" />
      <FormFieldError name="location" />
    </FormFieldContainer>
  )
}

export { LocationSelect }
