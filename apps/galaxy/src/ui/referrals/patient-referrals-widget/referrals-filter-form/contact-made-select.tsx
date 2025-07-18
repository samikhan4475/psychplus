'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { AUTH_IO_PROCESS } from '@/ui/int-referrals/constants'
import { sortCodesetBySortAttribute } from '@/ui/patient-lookup/utils'
import { PatientReferralsSchemaType } from './schema'

const ContactMadeSelect = () => {
  const form = useFormContext<PatientReferralsSchemaType>()
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
