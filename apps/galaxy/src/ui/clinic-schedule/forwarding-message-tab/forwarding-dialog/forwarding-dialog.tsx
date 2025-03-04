'use client'

import { PropsWithChildren, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'
import { ForwardingMessage } from '../types'
import { ForwardingForm } from './forwarding-form'

interface ForwardingDialogProps {
  title: string
  userId: number
  forwardingMessage?: ForwardingMessage
}

const ForwardingDialog = ({
  children,
  title,
  userId,
  forwardingMessage,
}: PropsWithChildren<ForwardingDialogProps>) => {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = (open: boolean) => setIsOpen(open)

  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggle}>
      {children}
      <Dialog.Content className="relative max-w-[640px] overflow-visible rounded-2">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>{title}</Dialog.Title>
        <ForwardingForm
          userId={userId}
          forwardingMessage={forwardingMessage}
          onClose={() => onToggle(false)}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ForwardingDialog }
