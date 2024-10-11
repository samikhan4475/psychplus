'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { PatientInfoSchemaType } from '../patient-info-schema'

const MotherMaidenNameInput = () => {
  const form = useFormContext<PatientInfoSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Mother Maiden Name</FormFieldLabel>
      <TextField.Root
        size="1"
        className={textFieldClassName}
        {...form.register('motherMaidenName')}
      />
      <FormFieldError name="motherMaidenName" />
    </FormFieldContainer>
  )
}

const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { MotherMaidenNameInput }
