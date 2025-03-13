'use client'

import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const options = [
  {
    value: 'NotSet',
    label: 'All',
  },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

const GMBSelect = () => {
  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel>GMB Link</FormFieldLabel>
      <SelectInput
        field="isGoogleLinkStatus"
        options={options}
        size="1"
        buttonClassName="w-[120px] h-6"
      />
    </FormFieldContainer>
  )
}

export { GMBSelect }
