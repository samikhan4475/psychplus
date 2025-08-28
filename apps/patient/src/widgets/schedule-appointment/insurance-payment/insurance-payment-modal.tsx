'use client'

import { useRef, useEffect } from 'react'
import { Box, Button, Flex, Heading } from '@radix-ui/themes'
import { usePublishSize } from '@psychplus/widgets/hooks'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { InsurancePaymentClient } from './insurance-payment.client'
import { CloseIconOutline } from '@/components-v2/icons/close-icon-outline'
import { AppointmentBookedIcon } from '@/components-v2/icons/appointment-booked-icon'

interface InsurancePaymentModalProps {
  isVisible: boolean
  onCancel: () => void
  stripeApiKey: string
  mapKey: string
}

const InsurancePaymentModal = ({
  isVisible,
  onCancel,
  stripeApiKey,
  mapKey,
}: InsurancePaymentModalProps) => {
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

  if (!isVisible) return null

  return (
    <Box className="fixed inset-0 h-screen z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4 pointer-events-auto">
      <Box className="bg-white max-w-[700px] w-full max-h-[90vh] rounded-6 pt-8 pb-[50px] px-10 overflow-y-auto pointer-events-auto">
        <Flex className="p-2 mb-2">
          <Flex justify="center" gap="2" grow="1">
            <AppointmentBookedIcon />
            <Heading className="font-[600] text-[28px] text-pp-blue-8">
              Appointment Booked!
            </Heading>
          </Flex>

          <Button
            variant="ghost"
            className="cursor-pointer size-8"
            onClick={onCancel}
          >
            <CloseIconOutline />
          </Button>
        </Flex>

        <InsurancePaymentClient onClose={onCancel} stripeApiKey={stripeApiKey} mapKey={mapKey} />
      </Box>
    </Box>
  )
}

export { InsurancePaymentModal } 