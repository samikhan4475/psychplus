import React, { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { CPT } from '../../types'
import { AddMasterFeeScheduleForm } from './add-master-fee-schedule-form'
import { transformIn } from './data'

interface AddMasterFeeScheduleDialogProps {
  cpt?: CPT
  children: React.ReactNode
}
const AddMasterFeeScheduleDialog = ({
  children,
  cpt,
}: AddMasterFeeScheduleDialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="relative max-w-[661px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          {cpt?.id ? 'Update' : 'Add'} Master Fee Schedule
        </Dialog.Title>
        <AddMasterFeeScheduleForm
          cpt={cpt?.id ? transformIn(cpt) : undefined}
          onCloseModal={onOpenChange}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddMasterFeeScheduleDialog }
