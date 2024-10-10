'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Gender</FormFieldLabel>
      <CodesetSelect
        name="gender"
        codeset={CODESETS.Gender}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { GenderSelect }
