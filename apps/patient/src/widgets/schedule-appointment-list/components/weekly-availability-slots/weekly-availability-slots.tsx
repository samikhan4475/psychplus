'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PATIENT_APP_URL } from '@psychplus-v2/env'
import { AppointmentSlot } from '@psychplus-v2/types'
import { cn, getCalendarDateLabel } from '@psychplus-v2/utils'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Staff } from '@psychplus/staff'
import { isMobile } from '@psychplus/utils/client'
import { formatTimeWithAmPm } from '@psychplus/utils/time'
import { clickTrack } from '@psychplus/utils/tracking'
import { SlotStateRenderer } from '@/components-v2/slot-state-render'
import { enums, PSYCHPLUS_TEST_SITE_URL } from '@/constants'
import { SERVICE_TYPES } from '@/constants/appointment'
import { useInViewOnce } from '@/hooks'
import { useSlots } from '@/hooks/use-slots'
import { InsurancePaymentModal } from '@/widgets/schedule-appointment/insurance-payment'
import { PersonalDetailsModal } from '@/widgets/schedule-appointment/personal-details'
import { useStore } from '../../store'
import type { ClinicWithSlots } from '../../types'
import {
  getNormalizedAppointmentType,
  getNormalizedProviderType,
  getValidStartDate,
  organizeSlotsByDate,
} from '../../utils'

interface WeeklyAvailabilitySlotsProps {
  staff: Staff
  staffTypeCode: number
  clinicWithSlots: ClinicWithSlots
  slotsLoading?: boolean
  setSlotsLoading?: (val: boolean) => void
  onClinicChange?: (index: number) => void
  selectedClinic?: number
  stripeKey: string
  mapKey: string
}

const WeeklyAvailabilitySlots = ({
  staff,
  staffTypeCode,
  clinicWithSlots,
  slotsLoading,
  setSlotsLoading,
  onClinicChange,
  selectedClinic,
  stripeKey,
  mapKey,
}: WeeklyAvailabilitySlotsProps) => {
  const {
    handleFiltersChange,
    filters: { startingDate, appointmentType, providerType, zipCode, sortBy },
  } = useStore()
  const [ref, inViewOnce] = useInViewOnce<HTMLDivElement>()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isInsuranceModalVisible, setIsInsuranceModalVisible] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null)

  const {
    showSlots,
    slotState,
    dateIsInFuture,
    nextAvailableSlotDate,
    fetchSlots,
    dateRange,
    errorMessage,
  } = useSlots({
    providerId: staff.id,
    clinicId: clinicWithSlots.clinic.id,
    appointmentType: getNormalizedAppointmentType(appointmentType),
    providerType: getNormalizedProviderType(
      [SERVICE_TYPES.PSYCHIATRY, SERVICE_TYPES.SUBOXONE_MAT].includes(
        providerType,
      )
        ? SERVICE_TYPES.PSYCHIATRY
        : providerType,
    ),
    zipCode: zipCode ?? '',
    startingDate: getValidStartDate(startingDate),
    selectedClinic,
    onClinicChange,
    setSlotsLoading,
    rawStartingDate: startingDate,
    transformFn: (data) => organizeSlotsByDate(data, startingDate),
    inViewOnce,
  })

  useEffect(() => {
    if (!sortBy || sortBy === 'Nearest') {
      onClinicChange?.(0)
    }
  }, [sortBy])

  return (
    <>
      <Flex
        gap="4"
        className={cn(
          'w-full max-sm:ml-0 sm:ml-[100px] md:ml-0 lg:ml-[53px]',
          isMobile() && 'overflow-x-auto',
        )}
        justify="center"
        ref={ref}
      >
        <SlotStateRenderer
          slotsLoading={slotsLoading}
          errorMessage={errorMessage}
          showSlots={showSlots}
          dateIsInFuture={dateIsInFuture}
          slotState={slotState.current}
          nextAvailableSlotDate={nextAvailableSlotDate}
          dateRange={dateRange}
          fetchSlots={fetchSlots}
          handleGoToAppointment={(dateLabel) =>
            handleFiltersChange({
              startingDate: dateLabel,
            })
          }
          renderSlotList={({ date }) => {
            const key = getCalendarDateLabel(date)
            const slots = slotState.current[key] ?? []

            return (
              <Flex className="w-full">
                {!isMobile() ? (
                  <SlotComponent
                    slots={slots}
                    clinicWithSlots={clinicWithSlots}
                    staff={staff}
                    staffTypeCode={staffTypeCode}
                    setIsModalVisible={setIsModalVisible}
                    setSelectedSlot={setSelectedSlot}
                  />
                ) : (
                  <MobileSlotComponent
                    slots={slots}
                    clinicWithSlots={clinicWithSlots}
                    staff={staff}
                    staffTypeCode={staffTypeCode}
                    setIsModalVisible={setIsModalVisible}
                    setSelectedSlot={setSelectedSlot}
                  />
                )}
              </Flex>
            )
          }}
        />
      </Flex>

      <PersonalDetailsModal
        isVisible={isModalVisible}
        slot={selectedSlot}
        staff={staff}
        clinic={clinicWithSlots?.clinic}
        onCancel={() => setIsModalVisible(false)}
        mapKey={mapKey}
        patientAppUrl={PATIENT_APP_URL ?? ''}
        openInsurancePaymentModal={() => setIsInsuranceModalVisible(true)}
      />

      <InsurancePaymentModal
        isVisible={isInsuranceModalVisible}
        stripeApiKey={stripeKey}
        mapKey={mapKey}
        onCancel={() => setIsInsuranceModalVisible(false)}
      />
    </>
  )
}

const MobileSlotComponent = ({
  slots,
  clinicWithSlots,
  staff,
  staffTypeCode,
  setIsModalVisible,
  setSelectedSlot,
}: {
  slots?: AppointmentSlot[]
  clinicWithSlots: ClinicWithSlots | undefined
  staff: Staff
  staffTypeCode: number
  setIsModalVisible: (visible: boolean) => void
  setSelectedSlot: (slot: AppointmentSlot) => void
}) => {
  const { setBookedSlot, filters } = useStore()

  const searchParams = useSearchParams()

  const state = searchParams.get('state')

  function setMobileBookedSlotDetails(slot: AppointmentSlot) {
    setBookedSlot({
      specialist: staff,
      clinic: clinicWithSlots?.clinic,
      type: filters.appointmentType,
      specialistTypeCode: staffTypeCode,
      duration: slot.duration,
      startDate: slot.startDate,
      state: state ?? '',
      servicesOffered: slot.servicesOffered,
      ...(slot?.locationId && { locationId: slot?.locationId }),
    })

    parent.postMessage(
      {
        event: enums.APPOINTMENT_SELECTED,
      },
      PSYCHPLUS_TEST_SITE_URL,
    )

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Schedule Appointment Screen',
      clickAction: 'Navigation',
      clickActionData: 'Clicked Slot',
    })

    setSelectedSlot(slot)
    setIsModalVisible(true)
  }

  return (
    <Flex className="overflow-x-auto flex-row pb-4 whitespace-nowrap" gap="4">
      {slots &&
        slots?.map((slot, i) => (
          <SlotItem
            key={`${slot.startDate}-${i}`}
            slot={slot}
            onBookedSlot={setMobileBookedSlotDetails}
          />
        ))}
    </Flex>
  )
}

const SlotComponent = ({
  slots,
  clinicWithSlots,
  staff,
  staffTypeCode,
  setIsModalVisible,
  setSelectedSlot,
}: {
  slots: AppointmentSlot[] | undefined
  clinicWithSlots: ClinicWithSlots | undefined
  staff: Staff
  staffTypeCode: number
  setIsModalVisible: (visible: boolean) => void
  setSelectedSlot: (slot: AppointmentSlot) => void
}) => {
  const [showAll, setShowAll] = useState(false)
  const handleShowMore = () => setShowAll(!showAll)
  const { setBookedSlot, filters } = useStore()

  const searchParams = useSearchParams()

  const state = searchParams.get('state')

  function setBookedSlotDetails(slot: AppointmentSlot) {
    setBookedSlot({
      clinic: clinicWithSlots?.clinic,
      specialist: staff,
      specialistTypeCode: staffTypeCode,
      type: filters.appointmentType,
      startDate: slot.startDate,
      duration: slot.duration,
      servicesOffered: slot.servicesOffered,
      state: state ?? '',
      ...(slot?.locationId && { locationId: slot?.locationId }),
    })

    parent.postMessage(
      {
        event: enums.APPOINTMENT_SELECTED,
      },
      PSYCHPLUS_TEST_SITE_URL,
    )

    clickTrack({
      productArea: 'Patient',
      productPageKey: 'Schedule Appointment Screen',
      clickAction: 'Navigation',
      clickActionData: 'Clicked Slot',
    })

    setSelectedSlot(slot)
    setIsModalVisible(true)
  }

  return (
    <Flex className="flex-col flex-1 pb-4 whitespace-nowrap" gap="4">
      {slots
        ?.slice(0, showAll || isMobile() ? slots.length : 3)
        ?.map((slot, i) => (
          <SlotItem
            key={`${slot.startDate}-${i}`}
            slot={slot}
            onBookedSlot={setBookedSlotDetails}
          />
        ))}

      {!isMobile() && (slots?.length ?? 0) > 3 && (
        <Button
          className="h-[36px] w-full rounded-[40px] bg-[#f0f4ff] p-2 text-[14px] font-medium leading-5 text-[#24366b] hover:bg-[#151B4A] hover:text-[white]"
          onClick={handleShowMore}
        >
          <Text>{showAll ? 'Less' : 'More'}</Text>
        </Button>
      )}
    </Flex>
  )
}

const SlotItem = ({
  slot,
  onBookedSlot,
}: {
  slot: AppointmentSlot
  onBookedSlot: (slot: AppointmentSlot) => void
}) => (
  <Button
    radius="full"
    variant="outline"
    highContrast
    className="min-h-[2.25rem] cursor-pointer border border-[#b9bbc6] px-3 text-[14px] font-medium leading-[20px] text-[#24366b] hover:bg-[#151B4A] hover:text-[white]"
    onClick={() => onBookedSlot(slot)}
  >
    {formatTimeWithAmPm(slot.startDate)}
  </Button>
)

export { WeeklyAvailabilitySlots, SlotComponent, MobileSlotComponent }
