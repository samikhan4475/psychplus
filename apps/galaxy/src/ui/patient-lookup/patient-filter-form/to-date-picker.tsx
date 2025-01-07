'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { PatientLookUpSchemaType } from './schema'

const ToDatePicker = () => {
  const form = useFormContext<PatientLookUpSchemaType>()
  const patientCreatedFrom = form.watch('patientCreatedFrom')

  return (
    <DatePickerInput
      field="patientCreatedTo"
      isDisabled={!patientCreatedFrom}
      minValue={patientCreatedFrom ?? undefined}
    />
  )
}

export { ToDatePicker }
