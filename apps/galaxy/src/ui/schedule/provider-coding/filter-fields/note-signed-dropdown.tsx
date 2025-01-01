'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'
import { CODESETS } from '@/constants'

const NoteSignedDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.NoteSigned)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Note Signed Status</FormFieldLabel>
      <CodesetSelect
        name="noteSignedStatus"
        codeset={CODESETS.NoteSignatureStatus}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { NoteSignedDropdown }
