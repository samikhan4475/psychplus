'use client'

import { useRef, useEffect } from 'react'
import { AppointmentSlot } from '@psychplus-v2/types'
import { Box, Button, Flex, Heading } from '@radix-ui/themes'
import { Staff } from '@psychplus/staff'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { usePublishSize } from '@psychplus/widgets/hooks'
import { CloseIconOutline } from '@/components-v2/icons/close-icon-outline'
import AppointmentDetailCard from '@/components/appointment-detail-card/appointment-detail-card'
import { GooglePlacesContextProvider } from '@/providers'
import type { ClinicWithSlots } from '@/widgets/schedule-appointment-list/types'
import { PersonalDetailsForm } from './form'

interface PersonalDetailsModalProps {
  isVisible: boolean
  slot: AppointmentSlot | null
  staff: Staff
  clinic: ClinicWithSlots['clinic'] | undefined
  onCancel: () => void
  mapKey: string
  patientAppUrl: string
  openInsurancePaymentModal: () => void
}

const PersonalDetailsModal = ({
  isVisible,
  slot,
  onCancel,
  mapKey,
  patientAppUrl,
  openInsurancePaymentModal,
}: PersonalDetailsModalProps) => {
  const ref = useRef<HTMLDivElement>(null)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  if (!isVisible || !slot) return null

  return (
    <Box className="bg-black fixed inset-0 z-[9999] flex h-screen items-center justify-center overflow-y-auto bg-opacity-50 p-4 pointer-events-auto">
      <Box className="bg-white max-h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-6 px-10 pb-[50px] pt-8 pointer-events-auto">
        <Flex className="p-2 mb-2">
          <Heading className="text-pp-blue-8 flex-grow text-center text-[28px] font-[600]">
            Book Appointment
          </Heading>

          <Button
            variant="ghost"
            className="cursor-pointer size-8"
            onClick={onCancel}
          >
            <CloseIconOutline />
          </Button>
        </Flex>

        <GooglePlacesContextProvider apiKey={mapKey}>
          <Box className="border-pp-gray-2 mb-2 rounded-[12px] border p-6">
            <AppointmentDetailCard />
          </Box>

          <Box className="border-pp-gray-2 rounded-[12px] border p-6">
            <PersonalDetailsForm
              patientAppUrl={patientAppUrl}
              openInsurancePaymentModal={openInsurancePaymentModal}
              onCancel={onCancel}
            />
          </Box>
        </GooglePlacesContextProvider>
      </Box>
    </Box>
  )
}

export { PersonalDetailsModal }
