'use client'

import { useState } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { MailIcon, MessageSquareTextIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { sendPolicyNoticeAction } from '@/actions'
import {
  CloseIcon,
  NotRequestedIcon,
  QuestionIcon,
  TickIcon,
} from '@/components/icons'
import { NotificationType, Policy } from '@/types'
import { useStore } from '../../store'

interface PolicySectionProps {
  patientId: string
  patientPolicyAStatus?: string
}

const PolicySection = ({
  patientId,
  patientPolicyAStatus,
}: PolicySectionProps) => {
  const store = useStore()
  const { isUserLocked } = zustandUseStore(store, (state) => ({
    isUserLocked: state.isUserLocked,
  }))

  const [isSending, setIsSending] = useState(false)

  const renderStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'Unverifiable':
        return <CloseIcon width={20} height={20} />
      case 'Pending':
        return <QuestionIcon width={20} height={20} />
      case 'Verified':
        return <TickIcon width={23} height={23} rectRx="6" />
      default:
        return <NotRequestedIcon width={20} height={20} />
    }
  }

  const disabled = isSending

  const sendSms = async () => {
    setIsSending(true)

    const result = await sendPolicyNoticeAction({
      patientId,
      channels: [NotificationType.Sms],
      policyType: Policy.PolicyA,
    })

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

    const result = await sendPolicyNoticeAction({
      patientId,
      channels: [NotificationType.Email],
      policyType: Policy.PolicyA,
    })

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
      <Flex gap="1" align="center" width="100%">
        {renderStatusIcon(patientPolicyAStatus)}
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
        {/* <Button
          size="1"
          variant="solid"
          color="blue"
          className="bg-pp-alt-blue text-[10px] disabled:bg-gray-5"
          disabled={disabled || isUserLocked}
          type="button"
        >
          <PhoneCall strokeWidth={1.5} size={14} />
          Call Patient
        </Button> */}
      </Flex>
    </Flex>
  )
}

export { PolicySection }
