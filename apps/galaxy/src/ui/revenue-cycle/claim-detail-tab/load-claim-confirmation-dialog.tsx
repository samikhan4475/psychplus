import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'

interface LoadClaimConfrimationDialogProps {
  isOpen: boolean
  toggleOpen: (open: boolean) => void
  onConfirm: () => void
}

const LoadClaimConfrimationDialog = ({
  isOpen,
  toggleOpen,
  onConfirm,
}: PropsWithChildren<LoadClaimConfrimationDialogProps>) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
      <Dialog.Content className="relative max-w-[550px]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <IconButton variant="ghost" color="gray" highContrast>
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>
        <Dialog.Description>
          This claim has been modified by another user. Please reload to see the
          latest changes.
        </Dialog.Description>
        <Flex gap="3" justify="end" mt="5">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button size="2" highContrast onClick={onConfirm}>
            Reload
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LoadClaimConfrimationDialog }
