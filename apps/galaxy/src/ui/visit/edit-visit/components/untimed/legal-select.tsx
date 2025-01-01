'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const LegalSelect = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Legal</FormFieldLabel>
      <CodesetSelect
        name="legal"
        disabled={isPsychiatristVisitTypeSequence}
        codeset={CODESETS.AdmissionLegalStatus}
        size="1"
        className="h-6 w-full"
      />
      <FormFieldError name="legal" />
    </FormFieldContainer>
  )
}

export { LegalSelect }
