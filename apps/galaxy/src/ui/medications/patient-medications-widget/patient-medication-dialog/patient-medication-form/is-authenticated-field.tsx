'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  YesNoSelect,
} from '@/components'

const IsAuthenticatedField = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>IsAuthenticated</FormFieldLabel>
      <YesNoSelect field="isAuthenticated" />
      <FormFieldError name="isAuthenticated" />
    </FormFieldContainer>
  )
}

export { IsAuthenticatedField }
