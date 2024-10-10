'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared/form-field-container'

const PatientStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Pt. Status</FormFieldLabel>
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
