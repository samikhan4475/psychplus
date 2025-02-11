'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getCodesetDisplayName } from '@/utils'
import { SchemaType } from '../../schema'

const VisitSequenceText = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.VisitSequence)
  const sequence = getCodesetDisplayName(form.watch('visitSequence'), codes)
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Visit Sequence</FormFieldLabel>
      <TextField.Root
        size="1"
        value={sequence}
        disabled
        className="h-6 w-full"
      />
      <FormFieldError name="visitSequence" />
    </FormFieldContainer>
  )
}

export { VisitSequenceText }
