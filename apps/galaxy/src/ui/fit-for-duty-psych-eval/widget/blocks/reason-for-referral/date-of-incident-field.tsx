'use client'

import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const DateOfIncidentField = ({ disabled = false }: BlockProps) => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row items-baseline gap-2">
      <FormFieldLabel required>
        Date of incident that led to this evaluation
      </FormFieldLabel>
      <DatePickerInput
        yearFormat="YYYY"
        field="dateOfIncident"
        className="w-[120px]"
        dateInputClass="!h-5 uppercase"
        isDisabled={disabled}
        showError={false}
        onChange={(value) => {
          form.setValue('dateOfIncident', value ?? null, {
            shouldDirty: true,
            shouldValidate: true,
          })
          form.trigger('dateOfIncident')
        }}
      />
      <FormFieldError name="dateOfIncident" />
    </FormFieldContainer>
  )
}

export { DateOfIncidentField }
