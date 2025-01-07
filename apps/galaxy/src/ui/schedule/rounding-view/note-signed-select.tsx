'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../context'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const NoteSignedSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.NoteSigned)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Note Signed Status</FieldLabel>
      <CodesetSelect
        name="noteSignedStatus"
        codeset={CODESETS.NoteSignatureStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { NoteSignedSelect }
