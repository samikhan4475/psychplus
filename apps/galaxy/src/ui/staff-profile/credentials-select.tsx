import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const CredentialsSelect = () => {
  const form = useFormContext()
  const staffUserRole = form.watch('staffUserRoleIds.0')
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Credentials</FormFieldLabel>
      <CodesetSelect
        size="1"
        disabled={staffUserRole === ''}
        codeset={CODESETS.PractitionerHonor}
        name="title"
      />
      <FormFieldError name="title" />
    </FormFieldContainer>
  )
}

export { CredentialsSelect }
