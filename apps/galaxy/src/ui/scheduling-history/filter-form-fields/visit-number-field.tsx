'use client'

import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'

const VisitNumberField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Visit Number</FormFieldLabel>
      <TextInput placeHolder="Search by number" field="visitId" />
    </FormFieldContainer>
  )
}

export { VisitNumberField }
