'use client'

import { useState } from 'react'
import { Button, Checkbox, Flex, Text } from '@radix-ui/themes'
import { MailIcon, MessageSquareTextIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { sendPolicyEmailAction, sendPolicySmsAction } from '../actions'

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
      justify="center"
      gap="2"
      className="bg-pp-bg-accent self-end rounded-2 p-2"
    >
      <Flex gap="2" align="center">
        <Checkbox highContrast checked={true} />
        <Text className="text-[12px]" weight="medium">
          Patient Policy A
        </Text>
      </Flex>

      <Button
        size="1"
        variant="surface"
        color="gray"
        highContrast
        className="bg-pp-alt-blue text-white h-auto px-1 py-[2px] text-[10px]"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault()
          sendSms()
        }}
      >
        <MessageSquareTextIcon strokeWidth={1.5} className="h-4 w-4" />
        Send SMS
      </Button>
      <Button
        size="1"
        variant="surface"
        color="gray"
        highContrast
        className="bg-pp-alt-blue text-white h-auto px-1 py-[2px] text-[10px]"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault()
          sendEmail()
        }}
      >
        <MailIcon strokeWidth={1.5} className="h-4 w-4" />
        Send Email
      </Button>
    </Flex>
  )
}

export { PolicySection }
