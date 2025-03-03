'use client'

import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { ClearingHouseReceiver } from '@/types'
import { AddReceiverButton } from './add-receiver-button'
import { EditReceiverButton } from './edit-receiver-button'
import { ReceiverForm } from './receiver-form'

interface DialogProps {
  data?: ClearingHouseReceiver | null
}

const ReceiverDialog = ({ data }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {data ? <EditReceiverButton /> : <AddReceiverButton />}

      <Dialog.Content className="relative max-w-[1000px] !overflow-visible">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {data ? 'Edit' : 'Add'} Receiver
        </Dialog.Title>

        <ReceiverForm data={data} onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ReceiverDialog }
