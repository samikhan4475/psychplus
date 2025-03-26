import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const CredentialsSelect = () => {
  const form = useFormContext()
  const staffUserRole = form.watch('staffUserRoleIds.0')
  return (
    <FormFieldContainer>
      <FormFieldLabel>Credentials</FormFieldLabel>
      <CodesetSelect
        size="1"
        disabled={staffUserRole === ''}
        codeset={CODESETS.PractitionerHonor}
        name="legalName.honors"
      />
    </FormFieldContainer>
  )
}

export { CredentialsSelect }
