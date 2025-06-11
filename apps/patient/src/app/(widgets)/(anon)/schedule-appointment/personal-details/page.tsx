'use client'

import { useRef } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { usePublishSize } from '@psychplus/widgets/hooks'
import AppointmentDetailCard from '@/components/appointment-detail-card/appointment-detail-card'
import { PersonalDetailsForm } from './form'
import { GooglePlacesContextProvider } from '@/providers'
import { useStore } from '@/widgets/schedule-appointment-list/store'

const PersonalDetails = () => {
  const ref = useRef<HTMLDivElement>(null)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)

  const { gMapKey } = useStore()

  return (
    <GooglePlacesContextProvider apiKey={gMapKey}>
    <Flex justify="center" ref={ref} className="px-5">
      <Flex direction="column" gap="6">
        <AppointmentDetailCard />
        <Flex direction="column" gap="2">
          <Text size="8" className="font-bold text-[#151B4A] text-5 md:text-8">
            Tell us a bit about yourself.
          </Text>
          <Text className="text-[#575759] text-2 md:text-4" size="4">
            To book your appointment, we need to verify just a few things.
          </Text>
        </Flex>

        <PersonalDetailsForm />
      </Flex>
    </Flex>
    </GooglePlacesContextProvider>
  )
}

export default PersonalDetails
