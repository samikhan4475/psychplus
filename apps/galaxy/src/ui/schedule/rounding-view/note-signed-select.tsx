'use client'

import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '@/components'
import { useRoundingFiltersContext } from './context'

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

const NoteSignedSelect = () => {
  const { filters } = useRoundingFiltersContext()
  if (!filters.includes('Note Signed')) return null

  return (
    <FormFieldContainer>
      <FormFieldLabel>Note Signed</FormFieldLabel>
      <SelectInput
        field="noteSigned"
        placeholder="Select"
        options={options}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { NoteSignedSelect }
