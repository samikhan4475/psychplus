import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const OrganizationSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Organization</FormFieldLabel>
      <CodesetSelect size="1" codeset={CODESETS.Gender} name="organization" />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
