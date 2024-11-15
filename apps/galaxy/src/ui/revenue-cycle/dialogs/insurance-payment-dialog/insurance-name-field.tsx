'use client'

import { AsyncAutoCompleteTextField } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { getInsurancePayerOptionsAction } from '../../actions'

const InsuranceNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Insurance Name</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getInsurancePayerOptionsAction}
        field="insuranceName"
        placeholder="Search"
        valueKey="label"
      />
    </FormFieldContainer>
  )
}

export { InsuranceNameField }
