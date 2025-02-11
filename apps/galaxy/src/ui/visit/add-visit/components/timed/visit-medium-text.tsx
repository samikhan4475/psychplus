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

const VisitMediumText = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const medium = getCodesetDisplayName(form.watch('visitMedium'), codes)
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Visit Medium</FormFieldLabel>
      <TextField.Root size="1" value={medium} disabled className="h-6 w-full" />
      <FormFieldError name="visitMedium" />
    </FormFieldContainer>
  )
}

export { VisitMediumText }
