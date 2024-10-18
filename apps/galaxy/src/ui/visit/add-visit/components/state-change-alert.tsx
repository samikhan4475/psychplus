'use client'

import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'

const StateChangeAlert = ({
  isOpen,
  onConfirm,
}: {
  isOpen: boolean
  onConfirm: (isConfirmed: boolean) => void
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isOpen) {
          onConfirm(true)
        }
      }}
    >
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[440px] rounded-2 border p-4 pb-5 [box-shadow:none]">
        <CloseDialogTrigger />
        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Flex direction="column" gap="3" pt="1" className="pr-4">
            <Dialog.Title size="4" className="m-0 font-medium">
              <Text size="4">
                This patient's primary address is not in the service state,
                please confirm that the patient is residing in the state of
                service to proceed
              </Text>
            </Dialog.Title>
            <Flex justify="start" width="100%" gap="2">
              <Button
                className={`bg-pp-link-text text-white w-[166px] cursor-pointer`}
                onClick={() => onConfirm(true)}
              >
                <Text size="2">Yes</Text>
              </Button>

              <Dialog.Close>
                <Button className="border-pp-gray-2 text-pp-black-3 bg-white w-[166px] cursor-pointer border border-solid">
                  <Text size="2">No</Text>
                </Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { StateChangeAlert }
