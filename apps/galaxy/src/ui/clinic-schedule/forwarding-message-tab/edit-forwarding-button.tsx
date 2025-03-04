'use client'

import { Dialog, IconButton } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'
import { ForwardingDialog } from './forwarding-dialog'
import { ForwardingMessage } from './types'

interface EditForwardingButton {
  forwardingMessage: ForwardingMessage
}
const EditForwardingButton = ({ forwardingMessage }: EditForwardingButton) => {
  return (
    <ForwardingDialog
      title="Edit Forwarding"
      forwardingMessage={forwardingMessage}
      userId={forwardingMessage.userId}
    >
      <Dialog.Trigger>
        <IconButton
          variant="ghost"
          size="1"
          className="m-0"
          color="gray"
          highContrast
        >
          <TableEditIcon height={18} />
        </IconButton>
      </Dialog.Trigger>
    </ForwardingDialog>
  )
}

export { EditForwardingButton }
