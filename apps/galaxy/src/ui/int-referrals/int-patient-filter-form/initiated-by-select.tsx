'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODE_NOT_USED, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const InitiatedBySelect = () => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
  const options = useCodesetOptions(CODESETS.UserRoleEnum, '', [CODE_NOT_USED])
  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Initiated By</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={form.getValues('initiatedByRoles')}
        onChange={(values) => form.setValue('initiatedByRoles', values)}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { InitiatedBySelect }
