'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared/form-field-container'
import { FieldLabel } from '../../shared'

const PatientStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>User Status</FieldLabel>
      <CodesetSelect
        name="patientStatuses"
        codeset={CODESETS.CustomerStatus}
        className="flex-1"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { PatientStatusSelect }
