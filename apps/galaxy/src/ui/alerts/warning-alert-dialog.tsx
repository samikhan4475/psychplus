'use client'

import { Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert, X } from 'lucide-react'

interface AlertDialogBaseProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  message?: string
  setMessage: (message: string) => void
}

const WarningAlertDialog = ({
  isOpen,
  setIsOpen,
  message,
  setMessage,
}: AlertDialogBaseProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsOpen(false)
          setMessage('')
        }
      }}
    >
      <Dialog.Content className="bg-pp-warning-bg relative max-w-[440px] rounded-1 p-4 pb-5 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Flex direction={'row'} gap={'3'} align={'start'}>
          <TriangleAlert className="min-w-6 text-amber-9" size={24} />
          <Flex direction={'column'} gap={'3'} pt={'1'}>
            <Dialog.Title size="4" className="m-0 font-medium">
              Action Required
            </Dialog.Title>
            <Text as="p" size={'2'}>
              {message ?? 'Something went wrong!'}
            </Text>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { WarningAlertDialog }
