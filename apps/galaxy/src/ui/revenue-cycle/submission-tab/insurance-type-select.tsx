import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
const insuranceTypeOptions = [
  { value: 'Primary', label: 'Primary' },
  { value: 'Secondary', label: 'Secondary' },
  { value: 'Tertiary', label: 'Tertiary' },
]
const InsuranceTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>
        Insurance Type
      </FormFieldLabel>
      <SelectInput
        field={'insuranceType'}
        options={insuranceTypeOptions}
        buttonClassName="w-[102px]"
      />
    </FormFieldContainer>
  )
}
export { InsuranceTypeSelect }
