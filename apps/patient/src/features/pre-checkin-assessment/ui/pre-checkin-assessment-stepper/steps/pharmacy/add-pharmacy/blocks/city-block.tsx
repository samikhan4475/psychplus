import React from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

const CityBlock = () => {
  return (
    <FormFieldContainer className="w-1/4">
      <FormFieldLabel required>City</FormFieldLabel>
      <CodesetFormSelect
        size="3"
        name="city"
        placeholder="Select"
        codeset={CODESETS.Gender}
      />
      <FormFieldError name="city" />
    </FormFieldContainer>
  )
}

export default CityBlock
