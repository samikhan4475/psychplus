'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PayerForm } from './add-payer-form'

const AddPayerDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Box className="mt-[18px] flex-1">
          <Button size="1" highContrast>
            <PlusIcon /> Add New
          </Button>
        </Box>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[500px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Payer
        </Dialog.Title>
        <PayerForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddPayerDialog }
