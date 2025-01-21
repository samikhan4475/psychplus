'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const TimeDependentSelect = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Time Dependent</FormFieldLabel>
      <SelectInput
        field="isServiceTimeDependent"
        options={options}
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
export { TimeDependentSelect }
