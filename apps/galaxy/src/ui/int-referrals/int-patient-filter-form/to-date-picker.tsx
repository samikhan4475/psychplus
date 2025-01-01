'use client'

import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const ToDatePicker = () => {
  const { watch } = useFormContext<IntReferralsPatientLookUpSchemaType>()
  const isDisabled = watch('fromReferralDate')

  return (
    <FormFieldContainer className="flex-1 flex-row gap-1">
      <FormFieldLabel className="!text-1">Order To</FormFieldLabel>
      <DatePickerInput field="toReferralDate" isDisabled={!isDisabled} />
    </FormFieldContainer>
  )
}

export { ToDatePicker }
