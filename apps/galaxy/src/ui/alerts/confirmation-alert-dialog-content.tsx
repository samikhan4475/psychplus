'use client'

import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { CloseDialogTrigger, LoadingPlaceholder } from '@/components'

interface ConfirmationAlertDialogProps {
  title: string
  loadingTitle?: string
  message?: string
  onProceed: () => void
  loading: boolean
  okButtonText?: string
  cancelButtonText?: string
}

const ConfirmationAlertDialogContent = ({
  title,
  loadingTitle,
  message,
  onProceed,
  loading,
  okButtonText,
  cancelButtonText,
}: ConfirmationAlertDialogProps) => {
  return (
    <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[440px] rounded-2 border p-4 pb-5 [box-shadow:none]">
      <CloseDialogTrigger />

      <Flex direction="row" gap="3" align="start">
        <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
        <Flex direction="column" gap="3" pt="1" className="pr-4" width="100%">
          <Dialog.Title size="4" className="m-0 font-medium">
            <Text size="4">{loading ? loadingTitle : title}</Text>
          </Dialog.Title>

          {loading ? (
            <LoadingPlaceholder className="mt-[38px]" />
          ) : (
            <>
              <Text as="p" size="2">
                {message}
              </Text>
              <Flex justify="start" width="100%" gap="2" mt="3">
                <Dialog.Close>
                  <Button
                    className="bg-pp-link-text text-white w-[166px]"
                    disabled={loading}
                  >
                    <Text size="2">
                      {cancelButtonText ? cancelButtonText : 'Cancel'}
                    </Text>
                  </Button>
                </Dialog.Close>
                <Button
                  variant="outline"
                  color="gray"
                  onClick={onProceed}
                  disabled={loading}
                  className="bg-white text-pp-black-3 w-[166px]"
                >
                  <Text size="2">
                    {okButtonText ? okButtonText : 'Proceed'}
                  </Text>
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Dialog.Content>
  )
}

export { ConfirmationAlertDialogContent }
