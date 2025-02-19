'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../context'
import { BookedAppointmentsSchemaType } from '../schema'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const LegalStatusSelect = () => {
  const { filters } = useFiltersContext()
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const options = useCodesetOptions(CODESETS.LegalStatus, '', [CODE_NOT_SET])
  if (!filters.includes(SchedulerFilters.Legal)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Legal</FieldLabel>
      <MultiSelectField
        className="flex-1"
        defaultValues={form.watch('legalStatuses')}
        options={options}
        menuClassName="w-[155px]"
        onChange={(values) => {
          form.setValue('legalStatuses', values, { shouldDirty: true })
        }}
      />
    </FormFieldContainer>
  )
}

export { LegalStatusSelect }
