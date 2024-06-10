import { Flex } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'

interface ConfirmDialogProps {
  confirm?: (confirm: boolean) => void
}

const ConfirmDialog = ({ confirm }: ConfirmDialogProps) => {
  return (
    <Dialog.Root
      open={confirm !== undefined}
      onOpenChange={(open) => {
        if (!open) {
          confirm?.(false)
        }
      }}
    >
      <Dialog.Content className="max-w-[450px]">
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Flex gap="3" justify="center" mt="5">
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              onClick={() => confirm?.(false)}
            >
              No
            </Button>
          </Dialog.Close>
          <Button size="2" onClick={() => confirm?.(true)}>
            Yes
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ConfirmDialog }
