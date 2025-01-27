import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ZipcodeInput,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'
import { PharmacySchemaType } from '../../pharmacy-schema'

const FIELD_ID = 'zipCode'

const ZipCodeBlock = () => {
  const form = useFormContext<PharmacySchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Zip Code</FormFieldLabel>
      <ZipcodeInput
        size="3"
        {...form.register(FIELD_ID)}
        value={form.watch(FIELD_ID)}
        placeholder={getPlaceholder(FIELD_ID)}
        disabled
      />
      <FormFieldError name={FIELD_ID} />
    </FormFieldContainer>
  )
}

export { ZipCodeBlock }
