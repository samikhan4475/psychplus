import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from './store'
import { SchemaType } from './submission-filter-form'

const insuranceTypeOptions = [
  { value: 'Primary', label: 'Primary' },
  { value: 'Secondary', label: 'Secondary' },
  { value: 'Tertiary', label: 'Tertiary' },
]
const InsuranceTypeSelect = () => {
  const form = useFormContext<SchemaType>()
  const { setFilteredInsurancePolicyPriority } = useStore((state) => state)

  const onValueChange = (value: string) => {
    form.setValue('insurancePolicyPriority', value)
    // Based on this state value we send request to download HCFA file
    setFilteredInsurancePolicyPriority(value)
  }

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Insurance Type</FormFieldLabel>
      <SelectInput
        field="insurancePolicyPriority"
        options={insuranceTypeOptions}
        buttonClassName="w-[102px]"
        onValueChange={onValueChange}
      />
    </FormFieldContainer>
  )
}
export { InsuranceTypeSelect }
