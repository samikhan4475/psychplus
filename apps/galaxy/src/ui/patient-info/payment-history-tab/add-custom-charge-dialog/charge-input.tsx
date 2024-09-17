'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const ChargeInput = () => {
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1">Charge</FormFieldLabel>
      <SelectInput
        field="charge"
        size="1"
        placeholder="Select"
        buttonClassName="border-pp-gray-2 w-full h-7 border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { ChargeInput }
