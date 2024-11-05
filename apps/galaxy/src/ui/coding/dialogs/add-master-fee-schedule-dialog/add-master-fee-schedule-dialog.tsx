import React from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { AddMasterFeeScheduleForm } from './add-master-fee-schedule-form'

const AddMasterFeeScheduleDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1" highContrast>
          <PlusIcon /> Add CPT
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[661px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Master Fee Schedule
        </Dialog.Title>
        <AddMasterFeeScheduleForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddMasterFeeScheduleDialog }
