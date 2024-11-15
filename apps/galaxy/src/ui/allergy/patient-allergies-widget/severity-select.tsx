'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const SeveritySelect = () => {
  const options = [
    { value: 'fatal', label: 'Fatal' },
    { value: 'severe', label: 'Severe' },
    { value: 'moderate_to_severe', label: 'Moderate to severe' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'mild_to_moderate', label: 'Mild to moderate' },
    { value: 'mild', label: 'Mild' },
  ]

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Severity</FormFieldLabel>
      <SelectInput
        options={options}
        field="severity"
        buttonClassName="w-[101px] h-6"
      />
    </FormFieldContainer>
  )
}

export { SeveritySelect }
