'use client'

import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const NoteSignedDropdown = () => {
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(CODESETS.NoteSignatureStatus)
  if (!filters.includes(SchedulerFilters.NoteSigned)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Note Signed Status</FieldLabel>
      <DropdownSelect
        field="noteSignedStatuses"
        options={options}
        shouldDirty
      />
    </FormFieldContainer>
  )
}

export { NoteSignedDropdown }
