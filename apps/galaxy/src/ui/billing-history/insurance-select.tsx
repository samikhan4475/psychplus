'use client'

import { getInsurancePayersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const InsuranceSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Insurance</FormFieldLabel>
      <AsyncSelect
        field="patientInsurancePayerId"
        placeholder="Select"
        fetchOptions={getInsurancePayersOptionsAction}
        buttonClassName="w-[101px] border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
        tooltip
      />
    </FormFieldContainer>
  )
}

export { InsuranceSelect }
