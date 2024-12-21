import { Button, Dialog, Flex } from '@radix-ui/themes'

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
        <Dialog.Description>
          A referral already exists for this service within the last 90 days.
        </Dialog.Description>
        <Flex gap="3" justify="center" mt="5">
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              onClick={() => confirm?.(false)}
            >
              No, keep existing referral
            </Button>
          </Dialog.Close>
          <Button
            size="2"
            type="submit"
            highContrast
            onClick={() => confirm?.(true)}
          >
            Yes, create a new referral
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ConfirmDialog }
