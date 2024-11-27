import React from 'react'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PracticeSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Practice</FormFieldLabel>
      <CodesetSelect size="1" codeset={CODESETS.Gender} name="practice" />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
