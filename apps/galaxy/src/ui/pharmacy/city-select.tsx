'use client'

import { getInsurancePayersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const CitySelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">City</FormFieldLabel>
      <AsyncSelect
        field="city"
        placeholder="Select"
        fetchOptions={getInsurancePayersOptionsAction}
        buttonClassName="w-[101px] border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
        tooltip
      />
    </FormFieldContainer>
  )
}

export { CitySelect }
