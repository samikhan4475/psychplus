'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const PrimaryProviderSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Primary Provider</FormFieldLabel>
      <SelectInput
        options={options}
        field="primaryProvider"
        buttonClassName="w-[120px] h-6"
        size="1"
      />
    </FormFieldContainer>
  )
}

const options = [
  { value: 'select', label: 'Select' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
export { PrimaryProviderSelect }
