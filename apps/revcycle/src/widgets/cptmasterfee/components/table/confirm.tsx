import { Flex } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'

interface ConfirmDialogProps {
  setConfirm: (confirm: boolean) => void
  confirm: boolean
  setDeleteState: (confirm: boolean) => void
}

const ConfirmationDialog = (props: ConfirmDialogProps) => {
  return (
    <Dialog.Root open={props.confirm} onOpenChange={props.setConfirm}>
      <Dialog.Content className="max-w-[450px]">
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Flex gap="3" justify="center" mt="5">
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              onClick={() => props.setDeleteState(false)}
            >
              No
            </Button>
          </Dialog.Close>
          <Button size="2" onClick={() => props.setDeleteState(true)}>
            Yes
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ConfirmationDialog }
