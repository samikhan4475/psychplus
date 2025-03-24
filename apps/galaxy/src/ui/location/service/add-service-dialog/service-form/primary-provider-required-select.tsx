'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const PrimaryProviderRequiredSelect = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Primary Provider Required</FormFieldLabel>
      <DropdownSelect
        options={options}
        field="isPrimaryProviderRequired"
        buttonClassName="w-full h-7"
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
