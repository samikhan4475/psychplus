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
      <Dialog.Content className="max-w-[550px]">
        <Dialog.Title>Are you sure you want to delete?</Dialog.Title>
        <Flex gap="3" justify="start">
          <Dialog.Description className='font-bold'>Do you really want to delete this record? The action cannot be undone</Dialog.Description>
        </Flex>
        <Flex gap="3" justify="end" mt="8">
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
