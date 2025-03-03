'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const SubmitterIdField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Submitter ID</FormFieldLabel>
      <TextInput
        field="submitterId"
        className="w-full"
        placeHolder="Search by ID"
      />
    </FormFieldContainer>
  )
}

export { SubmitterIdField }
