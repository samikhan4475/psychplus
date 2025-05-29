'use client'

import React from 'react'
import { Flex, Radio, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { TabletLineIcon } from '@/components/icons'
import { cn } from '@/utils'
import { PatientMedicationSchemaType } from '../patient-medication-form'
import { ConfirmationMethod } from '../types'
const MobileOtp = () => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const handleChange = () => {
    form.setValue('confirmationMethod', ConfirmationMethod.Otp)
  }
  return (
    <Flex
      direction="column"
      className="flex-1 cursor-pointer select-none overflow-hidden rounded-3"
      onClick={handleChange}
    >
      <Text
        size="2"
        as="label"
        className={cn(
          'bg-white border-pp-focus-bg flex flex-col items-center justify-center gap-2 !overflow-hidden rounded-3 border px-2 py-3',
          form.watch('confirmationMethod') === ConfirmationMethod.Otp &&
            'bg-pp-blue-100 border-pp-bg-primary border-2',
        )}
      >
        <Flex direction="column" gap="2">
          <Radio
            size="1"
            value={ConfirmationMethod.Otp}
            highContrast
            checked={
              form.watch('confirmationMethod') === ConfirmationMethod.Otp
            }
          />
          <TabletLineIcon
            color={
              form.watch('confirmationMethod') === ConfirmationMethod.Otp
                ? '#194595'
                : '#8B8D98'
            }
          />
        </Flex>
        <Flex direction="column" className="gap-2.5 text-center">
          <Text size="2" weight="medium">
           Time-based one-time password (TOTP)  
        </Text>
          <Text size="1" className="text-pp-gray-1">
            Add code shared on your screen.
          </Text>
        </Flex>
      </Text>
    </Flex>
  )
}

export { MobileOtp }
