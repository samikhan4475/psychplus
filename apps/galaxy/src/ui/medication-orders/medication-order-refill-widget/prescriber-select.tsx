'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

interface PrescriberSelectProps {
  options: { value: string; label: string }[]
}
const PrescriberSelect = ({ options }: PrescriberSelectProps) => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Prescriber</FormFieldLabel>
      <SelectInput
        field="providerName"
        buttonClassName="border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]"
        options={options}
      />
    </FormFieldContainer>
  )
}

export { PrescriberSelect }
