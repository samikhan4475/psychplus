import { useEffect, useState } from 'react'
import { Consent } from '@psychplus-v2/types'
import { transformSlotsByDay } from '@psychplus-v2/utils'
import { Box, Button, Flex } from '@radix-ui/themes'
import { SlotStateRenderer } from '@/components-v2/slot-state-render'
import { useStore } from '@/features/appointments/search/store'
import type {
  AppointmentAvailability,
  DialogAction,
} from '@/features/appointments/search/types'
import { useInViewOnce } from '@/hooks'
import { useSlots } from '@/hooks/use-slots'
import { AppointmentSortBy } from '../../constants'
import { AppointmentTimeSlots } from './availability-list'

interface ProviderSlotsProps {
  userConsents: Consent[]
  data: AppointmentAvailability
  setShowDifferentStateDialog: (action: DialogAction) => void
  selectedClinic: number
  onClinicChange: (value: number) => void
  slotsLoading: boolean
  setSlotsLoading: (bool: boolean) => void
}

const ProviderSlots = ({
  data,
  userConsents,
  setShowDifferentStateDialog,
  selectedClinic,
  onClinicChange,
  slotsLoading,
  setSlotsLoading,
}: ProviderSlotsProps) => {
  const [showMore, setShowMore] = useState(false)
  const [ref, inViewOnce] = useInViewOnce<HTMLDivElement>()

  const {
    appointmentType,
    startingDate,
    sortBy,
    setStartingDate,
    providerType,
    zipCode,
  } = useStore((state) => ({
    appointmentType: state.appointmentType,
    startingDate: state.startingDate,
    sortBy: state.sortBy,
    setStartingDate: state.setStartingDate,
    providerType: state.providerType,
    zipCode: state.zipCode,
    state: state.state,
  }))

  const {
    showSlots,
    slotState,
    dateRange,
    dateIsInFuture,
    nextAvailableSlotDate,
    fetchSlots,
    errorMessage,
  } = useSlots({
    providerId: data.specialist.id,
    clinicId: data?.clinics[selectedClinic]?.id,
    appointmentType,
    providerType,
    zipCode: zipCode ?? '',
    startingDate,
    selectedClinic,
    onClinicChange,
    setSlotsLoading,
    transformFn: (data) => transformSlotsByDay(data),
    inViewOnce,
  })

  useEffect(() => {
    if (!sortBy || sortBy === AppointmentSortBy.Nearest) {
      onClinicChange(0)
      return
    }
  }, [sortBy, data, dateRange])

  const checkHasMoreSlots = () => {
    const allSlotsByDay = Object.entries(slotState.current)
    return allSlotsByDay.some(([, value]) => value && value.length > 3)
  }

  return (
    <Flex className="flex-1 px-[40px] pt-2" ref={ref}>
      <Flex direction="column" gap="4" className="w-full">
        <SlotStateRenderer
          slotsLoading={slotsLoading}
          errorMessage={errorMessage}
          showSlots={showSlots}
          dateIsInFuture={dateIsInFuture}
          slotState={slotState.current}
          nextAvailableSlotDate={nextAvailableSlotDate}
          dateRange={dateRange}
          fetchSlots={fetchSlots}
          handleGoToAppointment={setStartingDate}
          renderSlotList={({ slots }) => (
            <Flex direction="column" align="center" gap="4">
              <AppointmentTimeSlots
                showMore={showMore}
                userConsents={userConsents}
                clinic={data.clinics[selectedClinic]}
                specialist={data.specialist}
                providerType={data.providerType}
                slots={slots}
                setShowDifferentStateDialog={setShowDifferentStateDialog}
              />
            </Flex>
          )}
          showMoreToggle={
            checkHasMoreSlots() ? (
              <Button
                onClick={() => setShowMore((prev) => !prev)}
                size="3"
                className="bg-pp-blue-1 text-accent-12"
              >
                {showMore ? 'See less' : 'See more'}
              </Button>
            ) : (
              <Box className="h-10" />
            )
          }
        />
      </Flex>
    </Flex>
  )
}
export { ProviderSlots }
