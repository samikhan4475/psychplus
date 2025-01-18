import { PropsWithChildren } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components'
import { ForwardingMessageForm } from './forwarding-message-form'

interface ForwardingMessageFormDialogProps extends PropsWithChildren {
  title: string
}

const ForwardingMessageFormDialog = ({
  children,
  title,
}: ForwardingMessageFormDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="min-w-[50%]">
        <Flex justify="between">
          <Dialog.Title>{title}</Dialog.Title>
          <CloseDialogTrigger />
        </Flex>
        <ForwardingMessageForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ForwardingMessageFormDialog }
