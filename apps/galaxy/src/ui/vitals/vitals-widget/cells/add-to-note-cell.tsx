'use client'

import { CheckboxCell } from '@/components'

interface AddToNoteCellProps {
  checked?: boolean
  className?: string
  onCheckedChange: (checked: boolean) => void
  disabled: boolean
}

const AddToNoteCell = ({
  checked,
  className,
  onCheckedChange,
  disabled,
}: AddToNoteCellProps) => {
  return (
    <CheckboxCell
      label={checked ? 'Yes' : 'No'}
      checked={checked || false}
      className={className}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
    />
  )
}

export { AddToNoteCell }
