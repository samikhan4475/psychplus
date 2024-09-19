import { Button } from '@psychplus/ui/button';
import { Dialog } from '@psychplus/ui/dialog';
import { Flex } from '@radix-ui/themes';

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({ isOpen, onConfirm, onCancel }: ConfirmDialogProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
        }
      }}
    >
      <Dialog.Content className="max-w-[500px]">
        <Dialog.Title align="center" mt="2">Are you sure you want to delete this record?</Dialog.Title>
        <Flex gap="3" justify="center" mt="8">
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button size="2" className="bg-[#e5484d] text-[#ffffff]" onClick={() => onConfirm()}>
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ConfirmDialog };
