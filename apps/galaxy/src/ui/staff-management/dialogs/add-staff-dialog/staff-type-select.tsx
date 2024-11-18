import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StaffTypeSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <CodesetSelect size="1" codeset={CODESETS.Gender} name="staffType" />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
