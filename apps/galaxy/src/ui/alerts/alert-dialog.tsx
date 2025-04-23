'use client'

import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { CloseDialogTrigger, LoadingPlaceholder } from '@/components'

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message?: string
  loading?: boolean
  okButton?: {
    text: string
    onClick: () => void
  }
  cancelButton?: {
    text: string
    onClick: () => void
  }
  disableClose?: boolean
}

const AlertDialog = ({
  open,
  onOpenChange,
  title,
  message,
  loading,
  okButton,
  cancelButton,
  disableClose = false,
}: AlertDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[440px] border ">
        <CloseDialogTrigger />

        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Flex direction="column" gap="3" pt="1" className="pr-4" width="100%">
            {title && (
              <Dialog.Title size="4" className="m-0 font-medium">
                <Text size="4">{title}</Text>
              </Dialog.Title>
            )}

            {loading ? (
              <LoadingPlaceholder className="mt-[38px]" />
            ) : (
              <>
                <Text as="p" size="2">
                  {message}
                </Text>
                <Flex justify="start" width="100%" gap="2" mt="3">
                  {!disableClose && (
                    <Dialog.Close>
                      <Button
                        className="bg-pp-link-text text-white w-[166px]"
                        disabled={loading}
                      >
                        <Text size="2">{cancelButton?.text || 'Cancel'}</Text>
                      </Button>
                    </Dialog.Close>
                  )}

                  {okButton && okButton?.text && (
                    <Button
                      variant="outline"
                      color="gray"
                      onClick={okButton.onClick}
                      disabled={loading}
                      className="bg-white text-pp-black-3 w-[166px]"
                    >
                      <Text size="2">{okButton.text ?? 'Proceed'}</Text>
                    </Button>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AlertDialog }
