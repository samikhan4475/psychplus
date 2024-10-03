import { CheckboxCell } from '@/components'

interface AddToNoteCellProps {
  checked: boolean
  className?: string
  onCheckedChange: (checked: boolean) => void
}

const AddToNoteCell = ({
  checked,
  className,
  onCheckedChange,
}: AddToNoteCellProps) => {
  return (
    <CheckboxCell
      label=""
      checked={checked}
      className={className}
      onCheckedChange={onCheckedChange}
    />
  )
}

export { AddToNoteCell }
