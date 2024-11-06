'use client'

import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const GuardianSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Guardian</FormFieldLabel>
      <DropdownSelect field="hasGuardian" options={options} />
    </FormFieldContainer>
  )
}
const options = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
export { GuardianSelect }
