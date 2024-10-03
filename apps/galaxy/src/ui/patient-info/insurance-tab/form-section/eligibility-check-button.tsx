'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { RepeatIcon } from 'lucide-react'
import { EligibilityCheckDialog } from '../dialogs'

interface EligibilityCheckButtonProps {
  disabled?: boolean
}

const EligibilityCheckButton = ({ disabled }: EligibilityCheckButtonProps) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button
        color="gray"
        size="1"
        className="text-black"
        variant="outline"
        type="button"
        onClick={onOpen}
        disabled={disabled}
      >
        <RepeatIcon size={14} /> Eligibility Check
      </Button>
      <EligibilityCheckDialog open={open} onClose={onClose} />
    </>
  )
}

export { EligibilityCheckButton }
