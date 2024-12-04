'use client'

import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PayerForm } from './add-payer-form'

interface AddPayerDialogProps {
  setAddingNewPayer: (value: boolean) => void
}

const AddPayerDialog = ({ setAddingNewPayer }: AddPayerDialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Box className="mt-[18px] flex-1">
          <Button size="1" highContrast type="button">
            <PlusIcon /> Add New
          </Button>
        </Box>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[500px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Payer
        </Dialog.Title>
        <PayerForm
          onCloseModal={onOpenChange}
          setAddingNewPayer={setAddingNewPayer}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddPayerDialog }
