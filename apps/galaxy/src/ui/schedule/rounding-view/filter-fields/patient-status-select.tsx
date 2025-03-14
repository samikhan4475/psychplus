'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const PatientStatusSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const options = useCodesetOptions(CODESETS.CustomerStatus)
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>User Status</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('patientStatuses')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          form.setValue('patientStatuses', values, { shouldDirty: true })
        }}
      />
    </FormFieldContainer>
  )
}

export { PatientStatusSelect }
