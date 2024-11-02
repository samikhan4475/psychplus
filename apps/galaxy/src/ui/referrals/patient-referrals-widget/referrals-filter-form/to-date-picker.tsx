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
  const isDisabled = watch('fromReferralDate')

  return (
    <FormFieldContainer className="max-w-44 flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">To</FormFieldLabel>
      <DatePickerInput field="toReferralDate" isDisabled={!isDisabled} />
    </FormFieldContainer>
  )
}

export { ToDatePicker }
