'use client'

import {
  AsyncAutoCompleteTextField,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { getPayerPlanOptionsAction } from '../actions'

const InsuranceSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Insurance</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getPayerPlanOptionsAction}
        field="insuranceId"
        placeholder="Search"
        valueKey="value"
        className="h-5 w-[210px]"
      />
    </FormFieldContainer>
  )
}

export { InsuranceSelect }
