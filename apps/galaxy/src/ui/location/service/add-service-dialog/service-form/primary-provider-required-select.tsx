'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const PrimaryProviderRequiredSelect = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Primary Provider Required</FormFieldLabel>
      <SelectInput
        options={options}
        field="isPrimaryProviderRequired"
        buttonClassName="w-full h-7"
        size="1"
        disabled
      />
    </FormFieldContainer>
  )
}

const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
export { PrimaryProviderRequiredSelect }
