'use client'

import { AsyncAutoCompleteTextField } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { getInsurancePayerOptionsAction } from '../../actions'

const InsuranceNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Insurance Name</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getInsurancePayerOptionsAction}
        field="insuranceName"
        placeholder="Search"
        valueKey="label"
      />
      <FormFieldError name="insuranceName" />
    </FormFieldContainer>
  )
}

export { InsuranceNameField }
