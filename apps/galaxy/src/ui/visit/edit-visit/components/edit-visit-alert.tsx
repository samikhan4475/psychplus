'use client'

import { useMemo, useState } from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PRIMARY_PROVIDER_ALERT_MESSAGE } from '../../constants'
import { mapMessages } from '../../utils'
import { SchemaType } from '../schema'

enum StatusCode {
  NoPermission = 406,
  OverridePermission = 428,
  ProceedConfirmation = 412,
}

const EditVisitAlert = ({
  isOpen,
  alertInfo,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  alertInfo: { message: string; statusCode: number }
  onClose: () => void
  onConfirm: (data: SchemaType) => void
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const form = useFormContext<SchemaType>()
  const { message, statusCode } = alertInfo
  const isConfirmation = [
    StatusCode.OverridePermission,
    StatusCode.ProceedConfirmation,
  ].includes(statusCode)

  const messages = useMemo(() => mapMessages(message), [message])
  const currentMessage = messages[currentMessageIndex]

  const handleSubmit = (body: Partial<SchemaType>) => {
    form.handleSubmit(
      (data) => {
        const isOverride = statusCode === StatusCode.OverridePermission
        onConfirm({
          ...data,
          isOverridePermissionProvided: isOverride,
          isProceedPermissionProvided: !isOverride,
          ...body,
        })
      },
      () => form.trigger(),
    )()
  }

  const handleYesClick = () => {
    if (currentMessage.toLowerCase().includes(PRIMARY_PROVIDER_ALERT_MESSAGE)) {
      handleSubmit({
        isOverridePrimaryProvider: true,
      })
      return
    }

    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1)
    } else {
      handleSubmit({ isOverridePrimaryProvider: undefined })
      setCurrentMessageIndex(0)
    }
  }

  const handleNoClick = () => {
    if (currentMessage.toLowerCase().includes(PRIMARY_PROVIDER_ALERT_MESSAGE)) {
      handleSubmit({
        isOverridePrimaryProvider: false,
      })
      return
    }
    setCurrentMessageIndex(0)
    onClose()
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isOpen) {
          onClose()
          setCurrentMessageIndex(0)
        }
      }}
    >
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[440px] rounded-2 border p-4 pb-5 [box-shadow:none]">
        <CloseDialogTrigger />
        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Flex direction="column" gap="3" pt="1" className="pr-5">
            <Dialog.Title size="4" className="m-0 font-medium">
              <Text size="4">{currentMessage}</Text>
            </Dialog.Title>
            <Flex justify="start" width="100%" gap="2">
              {isConfirmation ? (
                <>
                  <Button
                    className={`bg-pp-link-text text-white w-[166px] cursor-pointer`}
                    onClick={handleYesClick}
                  >
                    <Text size="2">Yes</Text>
                  </Button>
                  <Button
                    onClick={handleNoClick}
                    className="border-pp-gray-2 text-pp-black-3 bg-white w-[166px] cursor-pointer border border-solid"
                  >
                    <Text size="2">No</Text>
                  </Button>
                </>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditVisitAlert }
