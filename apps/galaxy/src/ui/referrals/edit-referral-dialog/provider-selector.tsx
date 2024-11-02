'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  ProviderSearchDropdown,
} from '@/components'
import { SchemaType } from './edit-referral-form'

const ProviderSelector = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="col-span-full">
      <FormFieldLabel>Referring Provider</FormFieldLabel>
      <ProviderSearchDropdown
        disabled
        initialValue={form.getValues('referredByName')}
      />
      <FormFieldError name="referredByName" />
    </FormFieldContainer>
  )
}

export { ProviderSelector }
