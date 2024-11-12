import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Dialog, Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'

const AlertMessage = ({
  alertMessage,
  setAlertMessage,
}: {
  alertMessage: { open: boolean; message: string }
  setAlertMessage: ({
    open,
    message,
  }: {
    open: boolean
    message: string
  }) => void
}) => {
  return (
    <Dialog.Root
      open={alertMessage.open}
      onOpenChange={(open) => {
        if (!open) {
          setAlertMessage({
            open: false,
            message: '',
          })
        }
      }}
    >
      <Dialog.Content className="bg-pp-warning-bg-1  border-pp-warning-border w-[440px] rounded-4 border border-solid p-6 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>

        <Flex direction="row" gap="3">
          <ExclamationTriangleIcon color="#F2AE40" width={24} height={24} />
          <Flex className="w-[330px]">
            <Text size="2">{alertMessage.message}</Text>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AlertMessage }
