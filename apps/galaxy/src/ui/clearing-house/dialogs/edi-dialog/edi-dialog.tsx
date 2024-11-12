'use client'

import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { EdiItem } from '../../types'
import { AddEdiButton } from './add-edi-button'
import { EdiForm } from './edi-form'
import { EditEdiButton } from './edit-edi-button'

interface DialogProps {
  data?: EdiItem
}

const EdiDialog = ({ data }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {data ? <EditEdiButton /> : <AddEdiButton />}

      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {data ? 'Edit' : 'New'} Insurance Plan EDI Setup
        </Dialog.Title>

        <EdiForm data={data} onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EdiDialog }
