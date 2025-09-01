'use client'

import { useSearchParams } from 'next/navigation'
import { getLocalTimeZone, isToday } from '@internationalized/date'
import { AppointmentType, CODESETS, PaymentType } from '@psychplus-v2/constants'
import { AppointmentSlot, Clinic } from '@psychplus-v2/types'
import { cn, getLocalCalendarDate } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { ProviderAvatar } from '@/components-v2'
import { BookedAppointmentProps } from '@/features/appointments/book/types'
import { AppointmentSpecialist } from '@/features/appointments/search/types'
import { InsurancePolicy } from '@/features/billing/payments/types'
import CallDetails from '@/features/call/blocks/call-details'
import { AcsInfo } from '@/features/call/types'
import { useCodesetCodes } from '@/providers'
import { getPrimaryInsurance } from '../../utils'
import AppointmentTypeInfo from './appointment-type-info'
import DateTimeInfo from './date-time-info'
import ProviderInfo from './provider-info'

const AppointmentDetails = ({
  bookedSlot,
  isCall = false,
  paymentMethod,
  activeCreditCard,
  patientInsurances,
  setPaymentMethod,
  acsInfo,
  isUnAuthenticated = false,
}: BookedAppointmentProps) => {
  const params = useSearchParams()
  const appointmentId = params.get('appointmentId')

  const slotDate = getLocalCalendarDate(
    isCall && acsInfo?.paymentData?.appointmentDateTime
      ? acsInfo?.paymentData?.appointmentDateTime
      : bookedSlot?.slot.startDate,
  )
  const isSlotToday = isToday(slotDate, getLocalTimeZone())

  const primaryPolicy = isCall
    ? getPrimaryInsurance(patientInsurances || ([] as InsurancePolicy[]))
    : undefined

  const codes = useCodesetCodes(CODESETS.VisitType ?? '')
  const visitType = codes?.find(
    (code) => code.value === acsInfo?.paymentData?.visitTypeCode,
  )

  return (
    <Flex
      gap="3"
      align={{ initial: 'start', md: isCall ? 'start' : 'center' }}
      className={cn(
        isCall ? 'rounded-[8px] border border-[#E0E0E0] p-[16px]' : '',
      )}
    >
      <ProviderAvatar
        provider={bookedSlot?.specialist as AppointmentSpecialist}
        size={{ initial: '4', md: isCall ? '6' : '8' }}
        isCall={isCall}
        acsInfo={acsInfo}
      />
      <Flex direction="column" gap="1">
        <ProviderInfo
          specialist={bookedSlot?.specialist as AppointmentSpecialist}
          acsInfo={acsInfo as AcsInfo}
          isCall={isCall}
        />

        {isCall ? (
          <>
            <Text className="text-[#1C2024]" size="2" weight="bold">
              {acsInfo?.paymentData?.service}
              {!isUnAuthenticated && <>- {visitType?.display || ''}</>}
            </Text>
            <DateTimeInfo
              slotDate={slotDate}
              isSlotToday={isSlotToday}
              slot={bookedSlot?.slot as AppointmentSlot}
              acsInfo={acsInfo as AcsInfo}
              isCall={isCall}
              appointmentId={appointmentId}
              isUnAuthenticated={isUnAuthenticated}
            />
            <CallDetails
              acsInfo={acsInfo as AcsInfo}
              paymentMethod={paymentMethod as PaymentType}
              setPaymentMethod={setPaymentMethod}
              primaryPolicy={primaryPolicy}
              activeCreditCard={activeCreditCard}
              isUnAuthenticated={isUnAuthenticated}
            />
          </>
        ) : (
          <>
            <DateTimeInfo
              slotDate={slotDate}
              isSlotToday={isSlotToday}
              slot={bookedSlot?.slot as AppointmentSlot}
              acsInfo={acsInfo as AcsInfo}
              isCall={isCall}
              appointmentId={appointmentId}
            />
            <AppointmentTypeInfo
              appointmentType={bookedSlot?.appointmentType as AppointmentType}
              newProviderType={bookedSlot?.newProviderType}
              clinic={bookedSlot?.clinic as Clinic}
            />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { AppointmentDetails }
