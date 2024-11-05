import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const CategorySelectField = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Category</FormFieldLabel>
      <CodesetSelect
        name="category"
        codeset={CODESETS.FeeScheduleCategoryType}
        size="1"
        className="w-full"
      />
      <FormFieldError name="category" />
    </FormFieldContainer>
  )
}

export { CategorySelectField }
