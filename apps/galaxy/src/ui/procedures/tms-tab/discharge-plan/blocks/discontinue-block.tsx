import React from 'react'
import { FormFieldContainer, FormFieldLabel, TextAreaInput } from '@/components'

const DiscontinueBlock = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Discontinue Treatment</FormFieldLabel>
      <TextAreaInput
        field="discontinueTreatmentDetail"
        className="h-full w-full"
      />
    </FormFieldContainer>
  )
}

export default DiscontinueBlock
