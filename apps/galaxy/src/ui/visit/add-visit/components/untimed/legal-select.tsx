'use client'

import { useFormContext, useWatch } from 'react-hook-form'
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
  const visitFrequency = useWatch({
    control: form.control,
    name: 'visitFrequency',
  })
  const codes = useCodesetCodes(CODESETS.AdmissionLegalStatus)

  const options = codes.map((option) => {
    return { label: option.display, value: option.value }
  })

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Legal</FormFieldLabel>
      <SelectInput
        field="legal"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!visitFrequency}
      />
      <FormFieldError name="legal" />
    </FormFieldContainer>
  )
}

export { LegalDropdown }
