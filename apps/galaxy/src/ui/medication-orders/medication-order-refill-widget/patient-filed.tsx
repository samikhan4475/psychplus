'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { MedicationFormFilterSchemaType } from './medication-order-refill-filter-form'

const PatientField = () => {
  const form = useFormContext<MedicationFormFilterSchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Patient Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Patient name"
        className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('patientFirstNameContains')}
      />
    </FormFieldContainer>
  )
}

export { PatientField }
