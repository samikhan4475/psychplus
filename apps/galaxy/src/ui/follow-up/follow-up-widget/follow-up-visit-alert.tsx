'use client'

import { useMemo, useState } from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PRIMARY_PROVIDER_ALERT_MESSAGE } from '@/ui/visit/constants'
import { VisitAlertType } from '@/ui/visit/types'
import { mapMessages } from '@/ui/visit/utils'
import { SchemaType } from './schema'

enum StatusCode {
  NoPermission = 406,
  ProceedConfirmation = 412,
  OverridePermission = 428,
}

const FollowUpVisitAlert = ({
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
  const form = useFormContext<SchemaType>()
  const [body, setBody] = useState<VisitAlertType>({})
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const { message, statusCode } = alertInfo
  const isConfirmation = [
    StatusCode.ProceedConfirmation,
    StatusCode.OverridePermission,
  ].includes(statusCode)

  const messages = useMemo(() => mapMessages(message), [message])

  const currentMessage = messages[currentMessageIndex]

  const handleSubmit = (overrideParams: Partial<SchemaType>) => {
    form.handleSubmit(
      (data) => onConfirm({ ...data, ...body, ...overrideParams }),
      () => form.trigger(),
    )()
  }

  const handleYesClick = () => {
    if (currentMessage.toLowerCase().includes(PRIMARY_PROVIDER_ALERT_MESSAGE)) {
      handleSubmit({ isOverridePrimaryProvider: true })
      return
    }

    const isOverride = statusCode === StatusCode.OverridePermission
    if (currentMessageIndex < messages.length - 1) {
      setBody({
        isProceedPermissionProvided: !isOverride,
        isOverridePermissionProvided: isOverride,
      })
      setCurrentMessageIndex(currentMessageIndex + 1)
    } else {
      handleSubmit({
        isOverridePermissionProvided: isOverride,
        isOverridePrimaryProvider: undefined,
        isProceedPermissionProvided: !isOverride,
      })
      setCurrentMessageIndex(0)
    }
  }

  const handleNoClick = () => {
    if (currentMessage.toLowerCase().includes(PRIMARY_PROVIDER_ALERT_MESSAGE)) {
      handleSubmit({ isOverridePrimaryProvider: false })
      return
    }

    onClose()
    setCurrentMessageIndex(0)
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (isOpen && !dialogNewState) {
          onClose()
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
                    onClick={handleYesClick}
                    className={`bg-pp-link-text text-white w-[166px] cursor-pointer`}
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

export { FollowUpVisitAlert }
