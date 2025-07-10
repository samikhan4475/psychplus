import { PropsWithChildren } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface UnlinkAccountConfrimationDialogProps {
  isOpen: boolean
  toggleOpen: (open: boolean) => void
  onConfirm: () => void
  title?: string
  isLoading: boolean
}

const UnlinkAccountConfrimationDialog = ({
  isOpen,
  toggleOpen,
  onConfirm,
  title,
  isLoading,
}: PropsWithChildren<UnlinkAccountConfrimationDialogProps>) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
      <Dialog.Content className="relative max-w-[550px]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <IconButton variant="ghost" color="gray" highContrast>
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>
        <Dialog.Description>
          Are you sure you want to unlink Patient{' '}
          <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>
          ?
        </Dialog.Description>
        <Flex gap="3" justify="end" mt="5">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            size="2"
            highContrast
            onClick={onConfirm}
            loading={isLoading}
            disabled={isLoading}
          >
            Yes
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { UnlinkAccountConfrimationDialog }
