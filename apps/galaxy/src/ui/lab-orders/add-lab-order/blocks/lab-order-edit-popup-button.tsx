import { IconButton } from '@radix-ui/themes'
import { PenLine } from 'lucide-react'

const LabOrderEditPopupButton = ({
  setOpen,
}: {
  setOpen: (value: boolean) => void
}) => {
  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      onClick={() => setOpen(true)}
    >
      <PenLine color="black" height="16" width="16" />
    </IconButton>
  )
}

export { LabOrderEditPopupButton }
