import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const CredentialsSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Credentials</FormFieldLabel>
      <CodesetSelect
        size="1"
        codeset={CODESETS.PractitionerHonor}
        name="legalName.honors"
      />
    </FormFieldContainer>
  )
}

export { CredentialsSelect }
