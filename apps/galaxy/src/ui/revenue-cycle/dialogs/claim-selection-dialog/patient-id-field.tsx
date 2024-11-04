'use client'

import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { getPatientsOptionsAction } from '../../actions'
import { AsyncAutoCompleteTextField } from '../../shared'

const PatientIdField = () => {
  return (
    <FormFieldContainer className="relative flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Patient Name</FormFieldLabel>
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

export { PatientIdField }
