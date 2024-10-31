import React from 'react'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { getPatientsOptionsAction } from '../actions'
import { AsyncAutoCompleteTextField } from '../shared'

const PatientInput = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Patient</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={getPatientsOptionsAction}
        field="patientId"
        placeholder="Search"
        className="h-5 w-[130px]"
        truncateText={10}
      />
    </FormFieldContainer>
  )
}
export { PatientInput }
