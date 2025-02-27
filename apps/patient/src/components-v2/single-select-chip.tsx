'use client'

import { useFormContext } from 'react-hook-form'
import { SelectableChip } from '@/components-v2/selectable-chip'
import { SelectableChipDetails } from '@/components-v2/selectable-chip-details'

type SelectableChipProps = Omit<
  React.ComponentProps<typeof SelectableChip>,
  'onClick' | 'selected'
>

interface SingleSelectChip extends SelectableChipProps {
  field: string
  details?: React.ComponentProps<typeof SelectableChipDetails>
}

const SingleSelectChip = ({ field, details, ...props }: SingleSelectChip) => {
  const form = useFormContext()

  const isSelected = form.watch(field) === true

  const toggleSelected = () => {
    form.clearErrors(details?.field)
    form.setValue(field, !form.getValues(field))
  }

  return (
    <SelectableChip selected={isSelected} onClick={toggleSelected} {...props}>
      {isSelected && details && <SelectableChipDetails {...details} />}
    </SelectableChip>
  )
}

export { SingleSelectChip }
