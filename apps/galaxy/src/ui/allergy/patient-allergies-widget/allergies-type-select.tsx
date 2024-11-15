'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const AllergiesTypeSelect = () => {
  const options = [
    { value: 'food_intolerance', label: 'Food Intolerance' },
    { value: 'food_allergy', label: 'Food Allergy' },
    { value: 'drug_allergy', label: 'Drug Allergy' },
    { value: 'drug_intolerance', label: 'Drug Intolerance' },
  ]
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Type</FormFieldLabel>
      <SelectInput
        options={options}
        field="allergyType"
        buttonClassName="w-[101px] h-6"
      />
    </FormFieldContainer>
  )
}

export { AllergiesTypeSelect }
