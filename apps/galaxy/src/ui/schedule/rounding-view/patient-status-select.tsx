'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'

const PatientStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Pt. Status</FormFieldLabel>
      <CodesetSelect
        name="visitMedium"
        codeset={CODESETS.CustomerStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PatientStatusSelect }
