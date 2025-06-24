import React, { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { InsurancePlanItem } from '../../types'
import { AddPlanDialogForm } from './add-plan-dialog-form'

interface AddPlanDialogProps {
  plan?: InsurancePlanItem
  children: React.ReactNode
}
const AddPlanDialog = ({ children, plan }: AddPlanDialogProps) => {
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
          {plan?.id ? 'Update' : 'Add'} Plan
        </Dialog.Title>
        <AddPlanDialogForm plan={plan} onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddPlanDialog }
