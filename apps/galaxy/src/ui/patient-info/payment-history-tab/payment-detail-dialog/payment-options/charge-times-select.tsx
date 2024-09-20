'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'

const ChargeTimesSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1 !font-medium">
        Charge times
      </FormFieldLabel>
      <SelectInput
        size="1"
        placeholder="Select"
        field="chargeTimes"
        buttonClassName="border-pp-gray-2 w-[148.5px] h-7 border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { ChargeTimesSelect }
