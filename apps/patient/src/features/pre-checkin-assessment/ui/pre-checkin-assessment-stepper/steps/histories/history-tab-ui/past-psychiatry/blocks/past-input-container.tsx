import React from 'react'
import { TextFieldInput } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components-v2'

const PastInputContainer = () => {
  return (
    <>
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Psych hospitalizations</FormFieldLabel>
        <TextFieldInput size="3" placeholder="Type number" />
      </FormFieldContainer>
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Suicide attempts</FormFieldLabel>
        <TextFieldInput size="3" placeholder="Type number" />
      </FormFieldContainer>
    </>
  )
}

export default PastInputContainer
