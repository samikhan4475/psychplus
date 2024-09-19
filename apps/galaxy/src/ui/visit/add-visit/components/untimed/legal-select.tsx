'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from '../../schema'

const LegalDropdown = () => {
  const form = useFormContext<SchemaType>()
  const visitFrequency = form.watch('visitFrequency')
  const codes = useCodesetCodes(CODESETS.AdmissionLegalStatus)

  useEffect(() => {
    form.setValue('legal', 'voluntary')
  }, [])

  const options = codes.map((option) => {
    return { label: option.display, value: option.value }
  })

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Legal</FormFieldLabel>
      <SelectInput
        field="legal"
        options={options}
        buttonClassName="flex-1"
        disabled={!visitFrequency}
      />
      <FormFieldError name="legal" />
    </FormFieldContainer>
  )
}

export { LegalDropdown }
