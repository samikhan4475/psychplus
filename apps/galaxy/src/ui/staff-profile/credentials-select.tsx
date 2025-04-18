import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './schema'
import { StaffType } from '../staff-management/types'

const CredentialsSelect = () => {
  const form = useFormContext<SchemaType>()
  const staffTypeLabel = form.watch('staffTypeLabel')
  return (
    <FormFieldContainer>
      <FormFieldLabel required={staffTypeLabel === StaffType.Provider}>Credentials</FormFieldLabel>
      <CodesetSelect
        size="1"
        codeset={CODESETS.PractitionerHonor}
        name="legalName.title"
      />
      <FormFieldError name="legalName.title" />
    </FormFieldContainer>
  )
}
export { CredentialsSelect }
