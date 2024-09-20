'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const ChargeFrequencySelect = () => {
  return (
    <FormFieldContainer className="w-auto">
      <FormFieldLabel className="!text-1 !font-medium">
        Charge Frequency
      </FormFieldLabel>
      <SelectInput
        size="1"
        placeholder="Select Type"
        field="chargeFrequency"
        buttonClassName="border-pp-gray-2 w-[113px] h-7 border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { ChargeFrequencySelect }
