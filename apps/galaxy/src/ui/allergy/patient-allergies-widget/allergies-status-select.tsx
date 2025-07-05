'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const AllergiesStatusSelect = () => {
  const options = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' }
  ]

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Status</FormFieldLabel>
      <SelectInput
        options={options}
        field="taskStatus"
        buttonClassName="w-[101px] h-6"
      />
    </FormFieldContainer>
  )
}

export { AllergiesStatusSelect }
