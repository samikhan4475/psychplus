'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../shared'
import { useFiltersContext } from '../context'
import { SchedulerFilters } from '../types'

const options = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]

const   NoteSignedSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.NoteSigned)) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Note Signed</FormFieldLabel>
      <SelectInput
        field="isNoteSigned"
        placeholder="Select"
        options={options}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { NoteSignedSelect }
