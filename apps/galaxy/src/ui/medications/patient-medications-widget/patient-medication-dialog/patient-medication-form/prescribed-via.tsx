'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const PrescribedVia = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Prescribed Via</FormFieldLabel>
      <CodesetSelect
        name="prescribedStatus"
        codeset={CODESETS.PrescribedStatus}
        className="w-full"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { PrescribedVia }
