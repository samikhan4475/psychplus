'use client'

import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { ClearingHouseSubmitter } from '../../types'
import { AddSubmitterButton } from './add-submitter-button'
import { EditSubmitterButton } from './edit-submitter-button'
import { SubmitterForm } from './submitter-form'

interface DialogProps {
  data?: ClearingHouseSubmitter | null
}

const SubmitterDialog = ({ data }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {data ? <EditSubmitterButton /> : <AddSubmitterButton />}

      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {data ? 'Edit' : 'Add'} Submitter
        </Dialog.Title>

        <SubmitterForm data={data} onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { SubmitterDialog }
