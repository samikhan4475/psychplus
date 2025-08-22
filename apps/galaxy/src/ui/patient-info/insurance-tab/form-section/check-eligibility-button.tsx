'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { RepeatIcon } from 'lucide-react'
import { Insurance } from '@/types'
import { CheckEligibilityDialog } from '../dialogs/check-eligibility-dialog'

interface CheckEligibilityButtonProps {
  disabled?: boolean
  insurance?: Insurance
  patientId: string
}

const CheckEligibilityButton = ({
  disabled,
  insurance,
  patientId,
}: CheckEligibilityButtonProps) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  const isDisabled = disabled || insurance?.isActive === false
  return (
    <>
      <Button
        color="gray"
        size="1"
        className={`text-black ${
          isDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        variant="outline"
        type="button"
        onClick={onOpen}
        disabled={isDisabled}
      >
        <RepeatIcon size={14} /> Eligibility Check
      </Button>
      <CheckEligibilityDialog
        insurance={insurance}
        patientId={patientId}
        open={open}
        onClose={onClose}
      />
    </>
  )
}

export { CheckEligibilityButton }
