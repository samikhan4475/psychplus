'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

interface PharmacySelectProps {
  options: { value: string; label: string }[]
}
const PharmacySelect = ({ options }: PharmacySelectProps) => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Pharmacy</FormFieldLabel>
      <SelectInput
        field="pharmacyName"
        buttonClassName="border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]"
        options={options}
      />
    </FormFieldContainer>
  )
}

export { PharmacySelect }
