'use client'

import React, { useEffect } from 'react'
import { Flex, Radio, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SheildLineIcon } from '@/components/icons'
import { cn } from '@/utils'
import { PatientMedicationSchemaType } from '../patient-medication-form'
import { ConfirmationMethod } from '../types'

const AutenticationOtp = () => {
  const form = useFormContext<PatientMedicationSchemaType>()
  useEffect(() => {
    if (!form.watch('confirmationMethod')) {
      form.setValue('confirmationMethod', ConfirmationMethod.Authenticator);
    }
  }, [form]);

  const handleChange = () => {
    form.setValue('confirmationMethod', ConfirmationMethod.Authenticator)
  }
  return (
    <Flex
      direction="column"
      className="flex-1 cursor-pointer select-none overflow-hidden rounded-3"
      onClick={handleChange}
    >
      <Text
        as="label"
        size="2"
        className={cn(
          'bg-white border-pp-focus-bg flex flex-col items-center justify-center gap-2 !overflow-hidden rounded-3 border px-2 py-3',
          form.watch('confirmationMethod') ===
            ConfirmationMethod.Authenticator &&
            'bg-pp-blue-100 border-pp-bg-primary border-2',
        )}
      >
        <Flex direction="column" gap="2">
          <Radio
            size="1"
            value={ConfirmationMethod.Authenticator}
            highContrast
            checked={
              form.watch('confirmationMethod') ===
              ConfirmationMethod.Authenticator
            }
          />
          <SheildLineIcon
            width={24}
            height={24}
            color={
              form.watch('confirmationMethod') ===
              ConfirmationMethod.Authenticator
                ? '#194595'
                : '#8B8D98'
            }
          />
        </Flex>

        <Flex direction="column" className="gap-2.5 text-center">
          <Text size="2" weight="medium">
            Push Notification Via Authy App
          </Text>
          <Text size="1" className="text-pp-gray-1">
            Use an authy app to approve or deny.
          </Text>
        </Flex>
      </Text>
    </Flex>
  )
}

export { AutenticationOtp }
