'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { ForwardingDialog } from './forwarding-dialog'

interface AddForwardingButtonProps {
  userId: number
}
const AddForwardingButton = ({ userId }: AddForwardingButtonProps) => {
  return (
    <ForwardingDialog title="Add Forwarding" userId={userId}>
      <Dialog.Trigger>
        <Button variant="solid" highContrast size="1">
          <Plus width={16} height={16} />
          Add Forwarding
        </Button>
      </Dialog.Trigger>
    </ForwardingDialog>
  )
}

export { AddForwardingButton }
