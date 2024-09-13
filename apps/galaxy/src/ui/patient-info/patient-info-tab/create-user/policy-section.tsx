'use client'

import { useState } from 'react'
import { Button, Checkbox, Flex, Text } from '@radix-ui/themes'
import { MailIcon, MessageSquareTextIcon, PhoneCall } from 'lucide-react'
import toast from 'react-hot-toast'
import { sendPolicyEmailAction, sendPolicySmsAction } from '../actions'
import { useStore } from '../store'

interface PolicySectionProps {
  patientId: string
  phone?: string
  email: string
  isPolicySigned: boolean
}

const PolicySection = ({
  patientId,
  phone,
  email,
  isPolicySigned,
}: PolicySectionProps) => {
  const { isUserLocked } = useStore((state) => ({
    isUserLocked: state.isUserLocked,
  }))
  const [isSending, setIsSending] = useState(false)

  const disabled = isSending

  const sendSms = async () => {
    if (!phone) {
      toast.error('Add a phone number first!')
      return
    }

    setIsSending(true)

    const result = await sendPolicySmsAction(patientId, phone)

    if (result.state === 'error') {
      toast.error('Failed to send text')
      setIsSending(false)
      return
    }

    toast.success('Text sent!')
    setIsSending(false)
  }

  const sendEmail = async () => {
    setIsSending(true)

    const result = await sendPolicyEmailAction(patientId, email)

    if (result.state === 'error') {
      toast.error('Failed to send email')
      setIsSending(false)
      return
    }

    toast.success('Email sent!')
    setIsSending(false)
  }

  return (
    <Flex
      justify="between"
      gap="2"
      className="bg-pp-bg-accent col-span-2 w-full self-end rounded-2 px-2 py-1.5"
    >
      <Flex gap="2" align="center" width="100%">
        <Checkbox
          color="green"
          defaultChecked
          disabled={isUserLocked}
          className="rounded-full bg-white overflow-hidden before:[box-shadow:none]"
        />
        <Text className="text-1" weight="medium">
          Patient Policy A
        </Text>
      </Flex>
      <Flex justify="end" gap="2" width="100%">
        <Button
          size="1"
          variant="solid"
          color="blue"
          className="bg-pp-alt-blue text-[10px] disabled:bg-gray-5"
          disabled={disabled || isUserLocked}
          type="button"
          onClick={(e) => {
            e.preventDefault()
            sendSms()
          }}
        >
          <MessageSquareTextIcon strokeWidth={1.5} size={14} />
          Send SMS
        </Button>
        <Button
          size="1"
          variant="solid"
          color="blue"
          className="bg-pp-alt-blue text-[10px] disabled:bg-gray-5"
          disabled={disabled || isUserLocked}
          type="button"
          onClick={(e) => {
            e.preventDefault()
            sendEmail()
          }}
        >
          <MailIcon strokeWidth={1.5} size={14} />
          Send Email
        </Button>
        <Button
          size="1"
          variant="solid"
          color="blue"
          className="bg-pp-alt-blue text-[10px] disabled:bg-gray-5"
          disabled={disabled || isUserLocked}
          type="button"
        >
          <PhoneCall strokeWidth={1.5} size={14} />
          Call Patient
        </Button>
      </Flex>
    </Flex>
  )
}

export { PolicySection }
