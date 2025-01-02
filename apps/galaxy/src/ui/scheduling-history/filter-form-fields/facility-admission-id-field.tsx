'use client'

import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'

const FacilityAdmissionIdField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Facility Admission ID</FormFieldLabel>
      <TextInput placeHolder="Search by number" field="facilityAdmissionId" />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionIdField }
