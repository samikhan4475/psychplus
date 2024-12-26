'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const VisitStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="appointmentStatus"
        codeset={CODESETS.AppointmentStatus}
        size="1"
        className="w-[200px] flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitStatusSelect }
