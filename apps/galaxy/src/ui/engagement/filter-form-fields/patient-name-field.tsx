'use client'

import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'

const PatientNameField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Patient Name</FormFieldLabel>
      <TextInput placeHolder="Search" field="patientName" />
    </FormFieldContainer>
  )
}

export { PatientNameField }
