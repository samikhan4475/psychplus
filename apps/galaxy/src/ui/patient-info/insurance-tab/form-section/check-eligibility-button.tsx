'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { RepeatIcon } from 'lucide-react'
import { CheckEligibilityDialog } from '../dialogs/check-eligibility-dialog'

interface CheckEligibilityButtonProps {
  disabled?: boolean
}

const CheckEligibilityButton = ({ disabled }: CheckEligibilityButtonProps) => {
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
      <CheckEligibilityDialog open={open} onClose={onClose} />
    </>
  )
}

export { CheckEligibilityButton }
