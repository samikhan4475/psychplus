'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { AddCardDialog } from '../add-credit-card-dialog'

interface AddCardButtonProps {
  stripeApiKey: string
  patientId: string
  googleApiKey: string
}
const AddCardButton = ({
  stripeApiKey,
  patientId,
  googleApiKey,
}: AddCardButtonProps) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button
        variant="ghost"
        color="violet"
        className="text-violet-12"
        size="1"
        type="button"
        onClick={onOpen}
      >
        Add Card / Change Card
      </Button>
      <AddCardDialog
        open={open}
        onClose={onClose}
        patientId={patientId}
        stripeApiKey={stripeApiKey}
        googleApiKey={googleApiKey}
      />
    </>
  )
}

export { AddCardButton }
