'use client'

import { Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert, X } from 'lucide-react'
import { useStore } from './store'

const AlertDialog = () => {
  const {
    setIsErrorAlertOpen,
    isErrorAlertOpen,
    setErrorMessage,
    errorMessage,
  } = useStore((state) => ({
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    isErrorAlertOpen: state.isErrorAlertOpen,
    setErrorMessage: state.setErrorMessage,
    errorMessage: state.errorMessage,
  }))

  return (
    <Dialog.Root
      open={isErrorAlertOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsErrorAlertOpen(false)
          setErrorMessage('')
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
              {errorMessage ?? 'Something went wrong!'}
            </Text>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AlertDialog }
