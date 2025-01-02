'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getInsurancePlanOptionsAction } from '../actions'

const PrimaryInsuranceSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Primary Insurance</FormFieldLabel>
      <AsyncSelect
        field="primaryInsurancePolicyId"
        placeholder="Select"
        fetchOptions={getInsurancePlanOptionsAction}
        buttonClassName="w-[120px] h-6"
        className="h-6 flex-1"
      />
    </FormFieldContainer>
  )
}

export { PrimaryInsuranceSelect }
