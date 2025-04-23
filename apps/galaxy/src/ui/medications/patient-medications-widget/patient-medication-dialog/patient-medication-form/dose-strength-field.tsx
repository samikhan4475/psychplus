'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'
import { PatientMedicationSchemaType } from './schema'

const DoseStrengthField = ({ index }: DrugBlockProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const field = getFieldName(index, 'doseStrength')
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Dose Strength</FormFieldLabel>
      <TextField.Root
        {...form.register(field)}
        className="h-6 w-[155px]"
        size="1"
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { DoseStrengthField }
