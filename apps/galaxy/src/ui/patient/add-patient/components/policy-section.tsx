'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { MailIcon, MessageSquareTextIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { CheckboxInput } from '@/components'
import { cn } from '@/utils'
import { SchemaType } from '../schema'

const PolicySection = ({
  isLoading,
  sendEmail,
  sendSMS,
}: {
  isLoading: boolean
  sendEmail: () => void
  sendSMS: () => void
}) => {
  const form = useFormContext<SchemaType>()
  const phone = form.watch('phoneNumber')
  const email = form.watch('email')
  const policyA = form.watch('patientPolicyA')
  const policyB = form.watch('patientPolicyB')
  const sendSMSIsDisabled = isLoading || !phone || !(policyA || policyB)
  const sendEmailIsDisabled = isLoading || !email || !(policyA || policyB)

  return (
    <Flex
      justify="between"
      gap="2"
      className="bg-pp-bg-accent col-span-2 w-full self-end rounded-2 px-2 py-1.5"
    >
      <Flex gap="2" align="center" width="100%">
        <CheckboxInput label={'Patient Policy A'} field={'patientPolicyA'} />
        <CheckboxInput label={'Patient Policy B'} field={'patientPolicyB'} />
      </Flex>
      <Flex justify="end" gap="2" width="100%">
        <Button
          size="1"
          variant="outline"
          type="submit"
          disabled={sendSMSIsDisabled}
          title='Save and Send SMS'
          className={cn(
            'active:bg-pp-focus-bg text-pp-blue-3 border-pp-blue-2 border-solid [box-shadow:none]',
            { 'border-gray-5 text-gray-9': sendSMSIsDisabled },
          )}
          onClick={sendSMS}
        >
          <MessageSquareTextIcon strokeWidth={1.5} size={14} />
          <Text size="1">Send SMS</Text>
        </Button>
        <Button
          size="1"
          variant="outline"
          disabled={sendEmailIsDisabled}
          title='Save and Send Email'
          className={cn(
            'active:bg-pp-focus-bg text-pp-blue-3 border-pp-blue-2 border-solid [box-shadow:none]',
            { 'border-gray-5 text-gray-9': sendEmailIsDisabled },
          )}
          onClick={sendEmail}
        >
          <MailIcon strokeWidth={1.5} size={14} />
          <Text size="1">Send Email</Text>
        </Button>
      </Flex>
    </Flex>
  )
}

export { PolicySection }
