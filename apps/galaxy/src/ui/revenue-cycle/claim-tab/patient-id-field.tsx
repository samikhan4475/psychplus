'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { SchemaType } from './claims-list-filter-form'

const PatientIdField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Patient</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-5 w-[130px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('patientId')}
        placeholder="Patient ID"
      />
    </FormFieldContainer>
  )
}

export { PatientIdField }
