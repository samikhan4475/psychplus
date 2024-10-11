'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PatientInfoSchemaType } from '../patient-info-schema'

const WorkPhoneExtInput = () => {
  const form = useFormContext<PatientInfoSchemaType>()

  return (
    <FormFieldContainer className="w-16">
      <FormFieldLabel className="!text-1">Ext</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Ext"
        {...form.register('contactDetails.workNumber.extension')}
      />
      <FormFieldError name="contactDetails.workNumber.extension" />
    </FormFieldContainer>
  )
}

export { WorkPhoneExtInput }
