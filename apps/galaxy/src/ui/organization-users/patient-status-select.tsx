'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PatientStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Pt Status</FormFieldLabel>
      <CodesetSelect
        name="patientStatuses"
        codeset={CODESETS.CustomerStatus}
        size="1"
        className="flex-1 min-w-[110px]"
      />
    </FormFieldContainer>
  )
}

export { PatientStatusSelect }
