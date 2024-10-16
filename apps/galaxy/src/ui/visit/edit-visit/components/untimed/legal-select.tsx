'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { SchemaType } from '../../schema'

const LegalSelect = () => {
  const form = useFormContext<SchemaType>()

  useEffect(() => {
    form.setValue('legal', 'voluntary')
  }, [])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Legal</FormFieldLabel>
      <CodesetSelect
        name="legal"
        codeset={CODESETS.AdmissionLegalStatus}
        size="1"
        className="h-6 w-full"
      />
      <FormFieldError name="legal" />
    </FormFieldContainer>
  )
}

export { LegalSelect }
