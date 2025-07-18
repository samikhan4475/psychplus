import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2 mr-11 ">
      <FormFieldLabel>Gender</FormFieldLabel>
      <CodesetSelect size="1" codeset={CODESETS.Gender} name="gender" />
      <FormFieldError name="gender" />      
    </FormFieldContainer>
  )
}

export { GenderSelect }
