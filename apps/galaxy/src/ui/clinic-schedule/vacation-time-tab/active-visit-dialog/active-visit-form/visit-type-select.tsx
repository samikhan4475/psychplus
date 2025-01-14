'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const VisitTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-1">
      <FormFieldLabel>Visit type</FormFieldLabel>
      <CodesetSelect size="1" name="visitType" codeset={CODESETS.VisitType} />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
