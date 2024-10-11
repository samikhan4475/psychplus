import React from 'react'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './submission-filter-form'
import { TextField } from '@radix-ui/themes'
const PatientInput = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center w-auto gap-1">
      <FormFieldLabel>
        Patient
      </FormFieldLabel>
      <TextField.Root
        size={'1'}
        placeholder='Patient ID'
        className='h-[var(--chip-height)] border-pp-gray-2 border border-solid w-[102px] !outline-none [box-shadow:none]'
        {...form.register("patientId")} />
    </FormFieldContainer>
  )
}
export { PatientInput }
