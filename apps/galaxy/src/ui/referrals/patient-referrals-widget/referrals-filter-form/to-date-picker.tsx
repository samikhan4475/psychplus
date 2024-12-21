'use client'

import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { PatientReferralsSchemaType } from './schema'

const ToDatePicker = () => {
  const { watch } = useFormContext<PatientReferralsSchemaType>()
  const isDisabled = watch('fromServiceDate')

  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Service To</FormFieldLabel>
      <DatePickerInput field="toServiceDate" isDisabled={!isDisabled} />
    </FormFieldContainer>
  )
}

export { ToDatePicker }
