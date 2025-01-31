'use client'

import { useCallback } from 'react'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getInsurancePlanOptionsAction } from '../actions'

const SecondaryInsuranceSelect = () => {
  const fetchOptions = useCallback(() => getInsurancePlanOptionsAction(), [])
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Secondary Insurance</FormFieldLabel>
      <AsyncSelect
        field="secondaryInsurancePolicyId"
        placeholder="Select"
        fetchOptions={fetchOptions}
        buttonClassName="w-[120px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SecondaryInsuranceSelect }
