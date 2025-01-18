'use client'

import { AsyncAutoCompleteTextField } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { getInsurancePlanOptionsAction } from '../../actions'

const InsuranceNameField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Insurance Name</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getInsurancePlanOptionsAction}
        field="insuranceName"
        placeholder="Search"
        valueKey="label"
      />
      <FormFieldError name="insuranceName" />
    </FormFieldContainer>
  )
}

export { InsuranceNameField }
