import { Box, Flex, Text } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'

const CustomDialog = ({
  onConfirm,
  isDialogOpen,
  message,
}: {
  onConfirm: (value: boolean) => void
  isDialogOpen: boolean
  message: string
}) => {
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={onConfirm}>
      <Dialog.Content className="max-w-[300px]">
        <Dialog.Title>Delete </Dialog.Title>

        <Flex>
          <Box>
            <Text>{message}</Text>
          </Box>
        </Flex>
        <Flex direction="row">
          <Box>
            <Button onClick={() => onConfirm(false)}>No</Button>
            <Button onClick={() => onConfirm(true)}>Yes</Button>
          </Box>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CustomDialog }
