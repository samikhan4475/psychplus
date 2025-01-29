'use client'

import { sendPolicyNoticeAction } from '@/actions'
import { CloseDialogTrigger } from '@/components'
import { NotificationType, Policy } from '@/types'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface PolicyConsentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message?: string
  patientId: string
}

const PolicyConsentDialog = ({
  open,
  onOpenChange,
  title,
  message,
  patientId,
}: PolicyConsentDialogProps) => {
  const [isSmsLoading, setIsSmsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const sendSms = async () => {
    setIsSmsLoading(true);
    const result = await sendPolicyNoticeAction({
      patientId,
      channels: [NotificationType.Sms],
      policyType: Policy.PolicyB,
    })
    setIsSmsLoading(false);
    if (result.state === 'error') {
      toast.error('Failed to send text')
      return
    }

    toast.success('Text sent!')
    onOpenChange(false);
  }

  const sendEmail = async () => {
    setIsEmailLoading(true);
    const result = await sendPolicyNoticeAction({
      patientId,
      channels: [NotificationType.Email],
      policyType: Policy.PolicyB,
    })
    setIsEmailLoading(false);
    if (result.state === 'error') {
      toast.error('Failed to send email')
      return
    }

    toast.success('Email sent!')
    onOpenChange(false);
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="bg-pp-warning-bg-1 border-pp-warning-border relative max-w-[440px] rounded-2 border p-4 pb-5 [box-shadow:none]">
        <CloseDialogTrigger />

        <Flex direction="row" gap="3" align="start">
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Flex direction="column" gap="3" pt="1" className="pr-4" width="100%">
            {title && (
              <Dialog.Title size="4" className="m-0 font-medium">
                <Text size="4">{title}</Text>
              </Dialog.Title>
            )}

            <Text as="p" size="2">
              {message}
            </Text>
            <Flex justify="start" width="100%" gap="2" mt="3">
              <Button
                variant="outline"
                color="gray"
                onClick={sendEmail}
                disabled={isEmailLoading}
                className="bg-white text-pp-black-3 w-[166px]"
              >
                <Text size="2">{'Via Email'}</Text>
              </Button>
              <Button
                variant="outline"
                color="gray"
                onClick={sendSms}
                disabled={isSmsLoading}
                className="bg-pp-link-text text-white w-[166px]"
              >
                <Text size="2">{'Via Sms'}</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PolicyConsentDialog }
