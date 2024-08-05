'use client'

import { useState } from 'react'
import {
  AppointmentType,
  PaymentType,
  ProviderType,
} from '@psychplus-v2/constants'
import { CareTeamMember, Clinic, Consent } from '@psychplus-v2/types'
import { Box, Flex } from '@radix-ui/themes'
import {
  AppointmentSlot,
  AppointmentSpecialist,
} from '@/features/appointments/search/types'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance } from '@/features/billing/payments/types'
import { InsurancePayer } from '@/features/billing/payments/types/insurance'
import { AppointmentDetails, PaymentMethods } from './book-appointment'
import { BookAppointmentButton } from './book-appointment/book-appointment-button'
import { ConfirmAppointment } from './book-appointment/confirm-appointment'

const BookAppointmentView = ({
  appointmentType,
  providerType,
  slot,
  clinic,
  specialist,
  mapKey,
  stripeApiKey,
  creditCards,
  userConsents,
  careTeam,
  patientInsurances,
  insurancePayers,
  appointmentId,
}: {
  appointmentId?: string
  appointmentType: AppointmentType
  providerType: ProviderType
  slot: AppointmentSlot
  clinic: Clinic
  specialist: AppointmentSpecialist
  mapKey: string
  stripeApiKey: string
  creditCards: CreditCard[]
  userConsents: Consent[]
  careTeam: CareTeamMember[]
  patientInsurances: Insurance[]
  insurancePayers: InsurancePayer[]
}) => {
  const [bookingSuccessful, setBookingSuccessful] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    PaymentType.Insurance,
  )

  const bookedSlot = {
    specialist,
    clinic,
    slot,
    appointmentType,
    providerType,
  }

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
          />
          <Box mt="5">
            <BookAppointmentButton
              appointmentId={appointmentId}
              bookedSlot={bookedSlot}
              careTeam={careTeam}
              userConsents={userConsents}
              setBookingSuccessful={setBookingSuccessful}
              paymentMethod={paymentMethod}
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
