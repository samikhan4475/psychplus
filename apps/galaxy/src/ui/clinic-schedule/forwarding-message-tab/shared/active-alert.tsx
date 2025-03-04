'use client'

import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'

interface ActiveAlertsProps {
  isOpen: boolean
  closeDialog: () => void
  mesage?: string
}

const ActiveAlerts = ({ isOpen, closeDialog, mesage }: ActiveAlertsProps) => {
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
        <CloseDialogTrigger className="hover:bg-transparent" />
        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Flex direction="column" gap="3" pt="1" className="pr-4">
            <Dialog.Title size="4" className="m-0 font-medium ">
              <Text size="4">{mesage}</Text>
            </Dialog.Title>
            <Flex justify="start" width="100%" gap="2" className="mt-[15px]">
              <Dialog.Close>
                <Button className="bg-pp-link-text text-white w-full cursor-pointer">
                  <Text size="2">OK</Text>
                </Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ActiveAlerts }
