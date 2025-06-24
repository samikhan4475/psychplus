'use client'

import { useMemo, useState } from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PRIMARY_PROVIDER_ALERT_MESSAGE } from '../../constants'
import { VisitAlertType } from '../../types'
import { mapMessages } from '../../utils'
import { SchemaType } from '../schema'

enum StatusCode {
  NoPermission = 406,
  OverridePermission = 428,
  ConflictCode = 409,
  ProceedConfirmation = 412,
}

const AddVisitAlert = ({
  alertInfo,
  isOpen,
  onConfirm,
  onClose,
}: {
  alertInfo: { message: string; statusCode: number }
  isOpen: boolean
  onConfirm: (data: SchemaType) => void
  onClose: () => void
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [body, setBody] = useState<VisitAlertType>({})
  const form = useFormContext<SchemaType>()
  const { message, statusCode } = alertInfo
  const isConfirmation = [
    StatusCode.OverridePermission,
    StatusCode.ProceedConfirmation,
  ].includes(statusCode)

  const messages = useMemo(() => mapMessages(message), [message])

  const currentMessage = messages[currentMessageIndex]

  const handleSubmit = (params: Partial<SchemaType>) => {
    form.handleSubmit(
      (data) => onConfirm({ ...data, ...body, ...params }),
      () => form.trigger(),
    )()
  }

  const handleYesClick = () => {
    if (currentMessage.toLowerCase().includes(PRIMARY_PROVIDER_ALERT_MESSAGE)) {
      handleSubmit({
        isOverridePrimaryProvider: true,
      })
      setCurrentMessageIndex(0)
      return
    }
    const isOverride = statusCode === StatusCode.OverridePermission
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1)
      setBody({
        isOverridePermissionProvided: isOverride,
        isProceedPermissionProvided: !isOverride,
      })
    } else {
      handleSubmit({
        isOverridePrimaryProvider: undefined,
        isOverridePermissionProvided: isOverride,
        isProceedPermissionProvided: !isOverride,
      })
      setCurrentMessageIndex(0)
    }
  }

  const handleNoClick = () => {
    if (currentMessage.toLowerCase().includes(PRIMARY_PROVIDER_ALERT_MESSAGE)) {
      handleSubmit({
        isOverridePrimaryProvider: false,
      })
      setCurrentMessageIndex(0)
      return
    }

    onClose()
    setCurrentMessageIndex(0)
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
                    className="border-pp-gray-2 text-pp-black-3 bg-white w-[166px] cursor-pointer border border-solid"
                    onClick={handleNoClick}
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

export { AddVisitAlert }
