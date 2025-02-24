'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel } from '../../shared'
import { FormFieldContainer } from '../../shared/form-field-container'
import { SchedulerFilters } from '../../types'

const LegalStatusSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(CODESETS.LegalStatus, undefined, [
    CODE_NOT_SET,
  ])
  if (!filters.includes(SchedulerFilters.Legal)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Legal</FieldLabel>
      <MultiSelectField
        options={options}
        defaultValues={form.watch('legalStatuses')}
        onChange={(values) => {
          form.setValue('legalStatuses', values, { shouldDirty: true })
        }}
        className="flex-1"
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { LegalStatusSelect }
