'use client'

import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'

const AddToNotesSaveButton = ({
  onClick,
  loading,
}: {
  onClick: () => void
  loading: boolean
}) => (
  <Button
    size="1"
    highContrast
    className="h-auto px-1 py-1 text-[11px] font-[300]"
    onClick={onClick}
    disabled={loading}
  >
    <SaveIcon width={15} height={15} strokeWidth={1.75} />
    Save
  </Button>
)

export { AddToNotesSaveButton }
