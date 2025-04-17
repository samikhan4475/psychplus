'use client'

import { FormFieldContainer, FormFieldLabel, MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from './organization-users-list-filter-form'

const PatientStatusSelect = () => {
  const options = useCodesetOptions(CODESETS.CustomerStatus)
  const form = useFormContext<SchemaType>()

  const patientStatuses = form.watch('patientStatuses')
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Pt Status</FormFieldLabel>
      <MultiSelectField
        defaultValues={patientStatuses ?? []}
        options={options}
        onChange={(values) => form.setValue('patientStatuses', values)}
        className="flex-1 min-w-[110px]"
      />
    </FormFieldContainer>
  )
}

export { PatientStatusSelect }
