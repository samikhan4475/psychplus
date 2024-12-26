'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Gender</FormFieldLabel>
      <CodesetSelect
        name="gender"
        codeset={CODESETS.Gender}
        size="1"
        className="w-[200px] flex-1"
      />
    </FormFieldContainer>
  )
}

export { GenderSelect }
