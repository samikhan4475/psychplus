'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { AddPayerPlanForm } from './add-payer-plan-form'

const PayerPlanDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1" highContrast>
          <PlusIcon /> Add Plan
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[900px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Payer Plan
        </Dialog.Title>
        <AddPayerPlanForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PayerPlanDialog }
