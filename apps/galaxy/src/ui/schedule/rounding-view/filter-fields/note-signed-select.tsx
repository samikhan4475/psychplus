'use client'

import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const NoteSignedSelect = () => {
  const { filters } = useFiltersContext()
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const options = useCodesetOptions(CODESETS.NoteSignatureStatus)
  if (!filters.includes(SchedulerFilters.NoteSigned)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Note Signed Status</FieldLabel>
      <MultiSelectField
        className="flex-1"
        defaultValues={form.watch('noteSignedStatuses')}
        onChange={(values) => {
          form.setValue('noteSignedStatuses', values, { shouldDirty: true })
        }}
        options={options}
      />
    </FormFieldContainer>
  )
}

export { NoteSignedSelect }
