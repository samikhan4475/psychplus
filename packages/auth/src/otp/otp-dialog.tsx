import { useState } from 'react'
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { PinCode } from '@psychplus/ui/pin-code'
import { type OTPSendStatus } from './types'

interface OTPDialogProps {
  email: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onSubmit: (value: string) => void
  onResend: () => void
  sendStatus: OTPSendStatus
  customStatusMessage?: string
}

const OTPDialog = ({
  email,
  isOpen,
  setIsOpen,
  onSubmit,
  onResend,
  sendStatus,
  customStatusMessage,
}: OTPDialogProps) => {
  const [value, setValue] = useState('')

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="w-fit px-24 py-8">
        <Flex direction="column" align="center">
          <Heading className='text-3 md:text-6' mb="3">
            Verify that it&apos;s you
          </Heading>
          <Flex direction="column" mb="4">
            <Text className='text-2 md:text-3'>Enter the code you received at</Text>
            <Text className='text-2 md:text-3'>{email}</Text>
          </Flex>
          <PinCode autoFocus onChange={setValue} />
          <Flex gap="3" mt="5">
            <Button variant="soft" color="gray" onClick={onResend}>
              Resend code
            </Button>
            <Button
              disabled={value.length !== 5}
              onClick={() => {
                onSubmit(value)
              }}
            >
              Submit
            </Button>
          </Flex>
          {renderSendStatus(sendStatus, customStatusMessage)}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const renderSendStatus = (
  sendStatus: OTPSendStatus,
  customStatusMessage: string | undefined,
) => {
  if (sendStatus !== 'sent' && sendStatus !== 'error') {
    return null
  }

  const color = sendStatus === 'sent' ? 'green' : 'red'
  const label =
    customStatusMessage ??
    (sendStatus === 'sent'
      ? 'A code has been sent to your email'
      : 'There was a problem with sending the code')

  const icon =
    sendStatus === 'sent' ? <CheckCircledIcon /> : <CrossCircledIcon />

  return (
    <Text size="2" mt="4" color={color}>
      <Flex align="center" gap="1">
        {icon}
        {label}
      </Flex>
    </Text>
  )
}
export { OTPDialog }
