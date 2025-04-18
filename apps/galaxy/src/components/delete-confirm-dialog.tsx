import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'

interface DeleteConfirmDialogProps {
  isOpen: boolean
  toggleOpen: (open: boolean) => void
  onDelete: () => void
  loading?: boolean
  title?: string
}

const DeleteConfirmDialog = ({
  children,
  isOpen,
  toggleOpen,
  onDelete,
  loading,
  title = 'record',
}: PropsWithChildren<DeleteConfirmDialogProps>) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
      {children && <Dialog.Trigger>{children}</Dialog.Trigger>}
      <Dialog.Content className="relative max-w-[550px]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <IconButton
            disabled={loading}
            variant="ghost"
            color="gray"
            type="button"
            highContrast
          >
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>
          <Text>Are you sure?</Text>
        </Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this {title}?
        </Dialog.Description>

        <Flex gap="3" justify="end" mt="5">
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              type="button"
              disabled={loading}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            size="2"
            color="red"
            type="button"
            onClick={onDelete}
            loading={loading}
          >
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeleteConfirmDialog }
