'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferralsSchemaType } from './schema'

const ContactMadeSelect = () => {
  const form = useFormContext<PatientReferralsSchemaType>()
  const options = useCodesetOptions(CODESETS.ContactMadeStatus)
  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Contact Made</FormFieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={form.getValues('contactStatusList')}
        onChange={(values) => form.setValue('contactStatusList', values)}
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { ContactMadeSelect }
