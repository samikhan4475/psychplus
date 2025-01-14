import { PropsWithChildren } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { SubmitHandler } from 'react-hook-form'
import { CloseDialogTrigger } from '@/components'
import { ForwardingMessageForm } from './forwarding-message-form'
import { SchemaType } from './schema'

const EditForwardingMessageDialog = ({ children }: PropsWithChildren) => {
  const handleSubmitEditForm: SubmitHandler<SchemaType> = () => {
    //TODO: Integrate edit forwarding message API
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="min-w-[50%]">
        <Flex justify="between">
          <Dialog.Title size="6">Edit Forwarding Message</Dialog.Title>
          <CloseDialogTrigger />
        </Flex>
        <ForwardingMessageForm onSubmit={handleSubmitEditForm} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditForwardingMessageDialog }
