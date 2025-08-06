'use client'

import { useFormContext } from 'react-hook-form'
import { NumberInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const PatientWidthInput = ({ disabled = false }: BlockProps) => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 flex-row !gap-2">
      <FormFieldLabel className="!text-1" required>
        Patient weight, in pounds
      </FormFieldLabel>
      <NumberInput
        field="patientWeight"
        format="###"
        placeholder=""
        suffixText="Ibs"
        className="h-5 w-16 rounded-1"
        disabled={disabled}
        onValueChange={(value) => {
          form.setValue('patientWeight', value)
          form.trigger('patientWeight')
        }}
      />
      <FormFieldError name="patientWeight" />
    </FormFieldContainer>
  )
}

export { PatientWidthInput }
