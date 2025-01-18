import { CloseDialogTrigger } from "@/components"
import { Dialog, Flex } from "@radix-ui/themes"
import { PropsWithChildren } from "react"


const EditForwardingMessage = ({children}:PropsWithChildren) => {
    return <Dialog.Root>
    <Dialog.Trigger>{children}</Dialog.Trigger>
    <Dialog.Content className="min-w-[50%]">
      <Flex justify="between">
        <Dialog.Title>Edit Forwarding Schedule</Dialog.Title>
        <CloseDialogTrigger />
      </Flex>
      {/* TODO: forwarding message form */}
    </Dialog.Content>
  </Dialog.Root> 
}

export { EditForwardingMessage }