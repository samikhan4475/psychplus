'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from '../../schema'

const LegalDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [
    patient,
    state,
    service,
    location,
    dateOfAdmission,
    admittingProvider,
    providerType,
  ] = useWatch({
    control: form.control,
    name: [
      'patient',
      'state',
      'service',
      'location',
      'dateOfAdmission',
      'admittingProvider',
      'providerType',
    ],
  })
  const codes = useCodesetCodes(CODESETS.AdmissionLegalStatus)
  const isDisabled =
    !patient ||
    !state ||
    !service ||
    !location ||
    !dateOfAdmission ||
    !admittingProvider ||
    !providerType

  const options = codes.map((option) => {
    return { label: option.display, value: option.value }
  }).filter(option => option.value !== CODE_NOT_SET)

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Legal</FormFieldLabel>
      <SelectInput
        field="legal"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={isDisabled}
      />
      <FormFieldError name="legal" />
    </FormFieldContainer>
  )
}

export { LegalDropdown }
