'use client'

import { getInsurancePayersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const InsuranceSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Insurance</FormFieldLabel>
      <AsyncSelect
        field="insuranceId"
        placeholder="Select"
        fetchOptions={getInsurancePayersOptionsAction}
        buttonClassName="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { InsuranceSelect }
