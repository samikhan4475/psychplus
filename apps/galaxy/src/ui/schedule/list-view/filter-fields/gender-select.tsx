'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared/form-field-container'
import { FieldLabel } from '../../shared'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Gender</FieldLabel>
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
