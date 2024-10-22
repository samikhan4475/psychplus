'use client'

import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { PatientLookUpSchemaType } from './schema'

const ToDatePicker = () => {
  const { watch } = useFormContext<PatientLookUpSchemaType>()

  const patientCreatedFrom = watch('patientCreatedFrom')

  return (
    <DatePickerInput
      field="patientCreatedTo"
      isDisabled={!patientCreatedFrom}
    />
  )
}

export { ToDatePicker }
