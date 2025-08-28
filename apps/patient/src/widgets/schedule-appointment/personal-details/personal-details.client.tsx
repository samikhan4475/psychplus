'use client'

import { useRef } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { usePublishSize } from '@psychplus/widgets/hooks'
import AppointmentDetailCard from '@/components/appointment-detail-card/appointment-detail-card'
import { GooglePlacesContextProvider } from '@/providers'
import { useStore } from '@/widgets/schedule-appointment-list/store'
import { PersonalDetailsForm } from './form'

interface PersonalDetailsClientProps {
  mapKey: string
  patientAppUrl:string
}
const PersonalDetailsClient = ({ mapKey,patientAppUrl }: PersonalDetailsClientProps) => {
  const ref = useRef<HTMLDivElement>(null)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)

  const { gMapKey } = useStore()

  return (
    <GooglePlacesContextProvider apiKey={mapKey ?? gMapKey}>
      <Flex justify="center" ref={ref} className="px-5">
        <Flex direction="column" gap="6">
          <AppointmentDetailCard />
          <Flex direction="column" gap="2">
            <Text
              size="8"
              className="text-5 font-bold text-[#151B4A] md:text-8"
            >
              Tell us a bit about yourself.
            </Text>
            <Text className="text-2 text-[#575759] md:text-4" size="4">
              To book your appointment, we need to verify just a few things.
            </Text>
          </Flex>

          <PersonalDetailsForm 
            patientAppUrl={patientAppUrl} 
            onCancel={() => undefined}
            openInsurancePaymentModal={() => {}}
            
          />
        </Flex>
      </Flex>
    </GooglePlacesContextProvider>
  )
}

export { PersonalDetailsClient }
