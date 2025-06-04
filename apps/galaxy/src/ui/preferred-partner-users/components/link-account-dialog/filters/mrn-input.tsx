'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const MRNInput = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">MRN</FormFieldLabel>
      <TextInput
        field="mrn"
        className="w-full"
        placeHolder="Search by MRN"
      />
    </FormFieldContainer>
  )
}

export { MRNInput }
