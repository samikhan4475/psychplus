'use client'

import React from 'react'
import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { enums, PSYCHPLUS_LIVE_URL } from '@/constants'

const ScheduleAppointmentConfirmationClient = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const myState = searchParams.get('myState')
  const providerState = searchParams.get('providerState')

  const handleConfirm = () => {
    parent.postMessage(
      {
        event: enums.APPOINTMENT_SELECTED,
      },
      PSYCHPLUS_LIVE_URL,
    )
    router.push(`/schedule-appointment/personal-details`)
  }

  const handleCancel = () => { 
    router.back()
  }

  return (
    <Box className="flex items-center justify-center mt-3">
      <Box className="bg-white shadow-3 border w-11/12 max-w-[580px] rounded-6 p-6">
        <Heading className="text-xl font-semibold mb-4">
          Provider in different state
        </Heading>
        <Text className="text-gray-600 mb-4 text-[16px]">
          You&apos;re about to book an appointment with the provider in &quot;
          {providerState}&quot;, but your primary address is in &quot;
          {myState}&quot;. Are you currently in the state where you are
          booking the appointment?
        </Text>
        <Flex gap="3" mt="4">
          <Button
            variant="outline"
            color="gray"
            className="w-6/12 cursor-pointer rounded-6 py-2 capitalize"
            highContrast
            onClick={handleCancel}
          >
            No, cancel appointment
          </Button>

          <Button
            className="w-6/12 cursor-pointer rounded-6 bg-[#24366B] py-2 capitalize"
            onClick={handleConfirm}
          >
            Yes, book appointment
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default ScheduleAppointmentConfirmationClient
