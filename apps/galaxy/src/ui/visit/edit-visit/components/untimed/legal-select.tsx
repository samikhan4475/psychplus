'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'

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
        exclude={[CODE_NOT_SET]}
        size="1"
        className="h-6 w-full"
      />
      <FormFieldError name="legal" />
    </FormFieldContainer>
  )
}

export { LegalSelect }
