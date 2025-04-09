import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'

interface LinkClaimConfirmationDialogProps {
  isOpen: boolean
  toggleOpen: (open: boolean) => void
  onConfirm: () => void
  loading?: boolean
}

const LinkClaimConfirmationDialog = ({
  isOpen,
  toggleOpen,
  onConfirm,
  loading,
}: PropsWithChildren<LinkClaimConfirmationDialogProps>) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
      <Dialog.Content className="relative max-w-[550px]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <IconButton
            disabled={loading}
            variant="ghost"
            color="gray"
            highContrast
          >
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>
          <Text>Link Claim with Visit</Text>
        </Dialog.Title>
        <Dialog.Description>
          Are you sure you want to link this visit number with this claim number
          (which is selected on top)?
        </Dialog.Description>

        <Flex gap="3" justify="end" mt="5">
          <Dialog.Close>
            <Button variant="soft" color="gray" disabled={loading}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button size="2" highContrast onClick={onConfirm} disabled={loading}>
            Yes
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { LinkClaimConfirmationDialog }
