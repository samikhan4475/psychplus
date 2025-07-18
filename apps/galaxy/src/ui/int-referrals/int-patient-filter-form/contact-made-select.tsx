'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { sortCodesetBySortAttribute } from '@/ui/patient-lookup/utils'
import { AUTH_IO_PROCESS } from '../constants'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const ContactMadeSelect = () => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
  const codes = useCodesetCodes(CODESETS.ContactMadeStatus)
  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Contact Made</FormFieldLabel>
      <MultiSelectField
        options={sortCodesetBySortAttribute(codes, {
          includeDisabled: true,
        }).filter((option) => option.value !== AUTH_IO_PROCESS)}
        defaultValues={form.getValues('contactStatusList')}
        onChange={(values) => form.setValue('contactStatusList', values)}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { ContactMadeSelect }
