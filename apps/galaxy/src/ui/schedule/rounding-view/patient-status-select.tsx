'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FieldLabel, FormFieldContainer } from '../shared'

const PatientStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>User Status</FieldLabel>
      <CodesetSelect
        name="patientStatuses"
        codeset={CODESETS.CustomerStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PatientStatusSelect }
