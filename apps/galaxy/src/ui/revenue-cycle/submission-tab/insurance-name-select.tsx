'use client'

import React from 'react'
import {
  AsyncAutoCompleteTextField,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { getPayerPlanOptionsAction } from '../actions'

const InsuranceNameSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="min-w-fit">Insurance Name</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getPayerPlanOptionsAction}
        field="insuranceId"
        placeholder="Search"
        valueKey="value"
        className="h-5 w-[210px]"
        truncateText={25}
      />
    </FormFieldContainer>
  )
}
export { InsuranceNameSelect }
