'use client'

import { useFormContext } from 'react-hook-form'
import { AsyncAutoCompleteTextField } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import {
  getInsurancePlanOptionsAction,
  InsurancePlanOptionType,
} from '../../actions'
import { SchemaType } from './schema'

const InsuranceNameField = () => {
  const form = useFormContext<SchemaType>()
  const onSelect = (plan: InsurancePlanOptionType) =>
    form.setValue('insurancePlanId', plan.insurancePlanId)
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel required>Insurance Name</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getInsurancePlanOptionsAction}
        field="insuranceName"
        onSelect={(plan) => onSelect(plan as InsurancePlanOptionType)}
        placeholder="Search"
        valueKey="label"
      />
      <FormFieldError name="insuranceName" />
    </FormFieldContainer>
  )
}

export { InsuranceNameField }
