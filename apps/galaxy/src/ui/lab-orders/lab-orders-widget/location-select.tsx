'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const LocationSelect = () => {
  const options = [
    { value: 'quest', label: 'Quest' },
    { value: 'psychplus', label: 'PsychPlus' },
  ]
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        options={options}
        field="orderingLab"
        buttonClassName="w-[101px] h-6"
      />
    </FormFieldContainer>
  )
}
export { LocationSelect }
