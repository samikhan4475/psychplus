'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const CosignerTypeSelect = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>Cosigner Type</FormFieldLabel>
      <CodesetSelect
        name="coSignerType"
        codeset={CODESETS.CosignerType}
        size="1"
        className="h-7"
      />
      <FormFieldError name="coSignerType" />
    </FormFieldContainer>
  )
}

export { CosignerTypeSelect }
