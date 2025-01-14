'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="gap-0.5">
      <FormFieldLabel>Gender</FormFieldLabel>
      <CodesetSelect size="1" name="gender" codeset={CODESETS.Gender} />
    </FormFieldContainer>
  )
}

export { GenderSelect }
