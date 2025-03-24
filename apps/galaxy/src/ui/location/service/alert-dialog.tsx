'use client'

import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'

interface AlertDialogProps {
  isOpen: boolean
  closeDialog: () => void
  onConfirm: () => void
  loading: boolean
}
const AlertDialog = ({
  isOpen,
  closeDialog,
  onConfirm,
  loading,
}: AlertDialogProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isOpen) {
          closeDialog()
        }
      }}
    >
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[500px] rounded-2 border p-4 pb-5 [box-shadow:none]">
        <CloseDialogTrigger />
        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Flex direction="column" gap="6" pt="1" className="pr-4">
            <Dialog.Title size="4" className="m-0 font-medium">
              <Text size="4">
                Are you sure you want to delete this service?
              </Text>
            </Dialog.Title>
            <Flex justify="start" width="100%" gap="2">
              <Button
                className="bg-pp-link-text text-white w-[50%] cursor-pointer"
                size="2"
                onClick={onConfirm}
                disabled={loading}
              >
                Yes
              </Button>
              <Dialog.Close>
                <Button
                  className="border-pp-gray-2 text-pp-black-3 bg-white w-[50%] cursor-pointer border border-solid"
                  size="2"
                  onClick={closeDialog}
                >
                  No
                </Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AlertDialog }
