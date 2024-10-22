'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.Gender}
        size="1"
        name="gender"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { GenderSelect }
