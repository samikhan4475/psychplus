'use client'

import { useEffect, useState } from 'react'
import { PaymentType } from '@psychplus-v2/constants'
import { CareTeamMember } from '@psychplus-v2/types'
import { Box, Flex } from '@radix-ui/themes'
import { useStore } from '@/features/appointments/search/store'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance } from '@/features/billing/payments/types'
import { InsurancePayer } from '@/features/billing/payments/types/insurance'
import { BookedSlot } from '../types'
import { AppointmentDetails, PaymentMethods } from './book-appointment'
import { BookAppointmentButton } from './book-appointment/book-appointment-button'
import { ConfirmAppointment } from './book-appointment/confirm-appointment'
import { redirect } from 'next/navigation'

const BookAppointmentView = ({
  mapKey,
  stripeApiKey,
  creditCards,
  careTeam,
  patientInsurances,
  insurancePayers,
}: {
  mapKey: string
  stripeApiKey: string
  creditCards: CreditCard[]
  careTeam: CareTeamMember[]
  patientInsurances: Insurance
  insurancePayers: InsurancePayer[]
}) => {
  const currentBookingData = useStore(
    (state) => state.currentBookingAppointmentData,
  )

  const [bookingSuccessful, setBookingSuccessful] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    PaymentType.Insurance,
  )

  const bookedSlot = {
    specialist: currentBookingData?.specialist,
    clinic: currentBookingData?.clinic,
    slot: currentBookingData?.slot,
    appointmentType: currentBookingData?.appointmentType,
    providerType: currentBookingData?.providerType,
    newProviderType: currentBookingData?.newProviderType,
  } as BookedSlot

  if (!currentBookingData) {
    redirect('/')
  }
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = '' // Required for Chrome to show prompt
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])
  return (
    <Flex direction="column" className="h-full w-full px-24" py="9">
      {!bookingSuccessful ? (
        <>
          <AppointmentDetails bookedSlot={bookedSlot} />
          <PaymentMethods
            creditCards={creditCards}
            stripeApiKey={stripeApiKey}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            patientInsurances={patientInsurances}
            insurancePayers={insurancePayers}
            appointmentType={currentBookingData?.appointmentType}
          />
          <Box mt="5">
            <BookAppointmentButton
              appointmentId={currentBookingData?.appointmentId}
              bookedSlot={bookedSlot}
              careTeam={careTeam}
              setBookingSuccessful={setBookingSuccessful}
              paymentMethod={paymentMethod}
              creditCards={creditCards}
              patientInsurances={patientInsurances}
            />
          </Box>
        </>
      ) : (
        <ConfirmAppointment bookedSlot={bookedSlot} mapKey={mapKey} />
      )}
    </Flex>
  )
}

export { BookAppointmentView }
