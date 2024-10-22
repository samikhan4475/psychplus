'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const GuardianSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Guardian</FormFieldLabel>
      <SelectInput
        field="hasGuardian"
        options={options}
        className="flex-1"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}
const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
export { GuardianSelect }
