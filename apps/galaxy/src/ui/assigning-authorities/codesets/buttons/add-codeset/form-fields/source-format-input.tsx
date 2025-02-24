'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const SourceFormatInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Source Format</FormFieldLabel>
      <CodesetSelect
        disabled={disabled}
        name="sourceFormat"
        codeset={CODESETS.FileFormatType}
        size="1"
        className="h-6 w-full"
        placeholder="Select source format"
      />
      <FormFieldError name="sourceFormat" />
    </FormFieldContainer>
  )
}

export { SourceFormatInput }
