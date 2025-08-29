'use client'

import { useSearchParams } from 'next/navigation'
import { getLocalTimeZone, isToday } from '@internationalized/date'
import { CODESETS, PaymentType } from '@psychplus-v2/constants'
import { cn, getLocalCalendarDate } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { ProviderAvatar } from '@/components-v2'
import { BookedAppointmentProps } from '@/features/appointments/book/types'
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
}: BookedAppointmentProps) => {
  const params = useSearchParams()
  const appointmentId = params.get('appointmentId')
  const { specialist, clinic, slot, appointmentType, newProviderType } =
    bookedSlot

  const slotDate = getLocalCalendarDate(
    isCall ? acsInfo?.paymentData?.appointmentDateTime : slot.startDate,
  )
  const isSlotToday = isToday(slotDate, getLocalTimeZone())

  const primaryPolicy = isCall
    ? getPrimaryInsurance(patientInsurances || [] as InsurancePolicy[])
    : undefined

  const codes = useCodesetCodes(CODESETS.VisitType ?? '')
  const visitType = codes.find(
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
        provider={specialist}
        size={{ initial: '4', md: isCall ? '6' : '8' }}
      />
      <Flex direction="column" gap="1">
        <ProviderInfo
          specialist={specialist}
          acsInfo={acsInfo as AcsInfo}
          isCall={isCall}
        />

        {isCall ? (
          <>
            <Text className="text-[#1C2024]" size="2" weight="bold">
              {acsInfo?.paymentData.service} - {visitType?.display || ''}
            </Text>
            <DateTimeInfo
              slotDate={slotDate}
              isSlotToday={isSlotToday}
              slot={slot}
              acsInfo={acsInfo as AcsInfo}
              isCall={isCall}
              appointmentId={appointmentId}
            />
            <CallDetails
              acsInfo={acsInfo as AcsInfo}
              paymentMethod={paymentMethod as PaymentType}
              setPaymentMethod={setPaymentMethod}
              primaryPolicy={primaryPolicy}
              activeCreditCard={activeCreditCard}
            />
          </>
        ) : (
          <>
            <DateTimeInfo
              slotDate={slotDate}
              isSlotToday={isSlotToday}
              slot={slot}
              acsInfo={acsInfo as AcsInfo}
              isCall={isCall}
              appointmentId={appointmentId}
            />
            <AppointmentTypeInfo
              appointmentType={appointmentType}
              newProviderType={newProviderType}
              clinic={clinic}
            />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { AppointmentDetails }
