'use client'

import { CalendarDate } from '@internationalized/date'
import { AppointmentSlot } from '@psychplus-v2/types'
import { getCalendarDate, getCalendarDateLabel } from '@psychplus-v2/utils'
import { Box, Button, Flex } from '@radix-ui/themes'
import {
  EmptyFileIcon,
  FeatureEmpty,
  LoadingPlaceholder,
} from '@/components-v2'
import { getNextAvailableDateLabel } from '@/features/appointments/search/utils'

interface SlotStateRendererProps {
  slotsLoading?: boolean
  errorMessage?: string | null
  showSlots: boolean
  dateIsInFuture: boolean
  slotState: Record<string, AppointmentSlot[] | undefined>
  nextAvailableSlotDate: string
  dateRange: CalendarDate[]
  fetchSlots: () => void
  handleGoToAppointment: (dateLabel: string) => void
  renderSlotList: (slotsByDay: {
    date: CalendarDate
    slots: AppointmentSlot[]
  }) => React.ReactNode
  showMoreToggle?: React.ReactNode
}

export const SlotStateRenderer = ({
  slotsLoading,
  errorMessage,
  showSlots,
  dateIsInFuture,
  slotState,
  nextAvailableSlotDate,
  dateRange,
  fetchSlots,
  handleGoToAppointment,
  renderSlotList,
  showMoreToggle,
}: SlotStateRendererProps) => {
  if (slotsLoading) return <LoadingPlaceholder />

  if (errorMessage) {
    return (
      <FeatureEmpty
        description={errorMessage}
        action={
          <Flex justify="center">
            <Button
              size="3"
              className="justify-center"
              onClick={fetchSlots}
              highContrast
            >
              Retry
            </Button>
          </Flex>
        }
        Icon={EmptyFileIcon}
      />
    )
  }

  if (!showSlots) {
    return (
      <FeatureEmpty
        description="Click below to view available slots"
        action={
          <Flex justify="center">
            <Button
              size="3"
              className="justify-center"
              onClick={fetchSlots}
              highContrast
            >
              Show Available Slots
            </Button>
          </Flex>
        }
        Icon={EmptyFileIcon}
      />
    )
  }

  if (Object.keys(slotState)?.length === 0) {
    return (
      <FeatureEmpty
        description="No slots available for this provider"
      />
    )
  }

  if (dateIsInFuture) {
    return (
      <FeatureEmpty
        description={`Next available appointment on ${getNextAvailableDateLabel(
          getCalendarDate(nextAvailableSlotDate),
        )}`}
        action={
          <Flex justify="center">
            <Button
              size="3"
              className="justify-center"
              onClick={() =>
                handleGoToAppointment(
                  getCalendarDateLabel(getCalendarDate(nextAvailableSlotDate)),
                )
              }
              highContrast
            >
              Go to Appointment
            </Button>
          </Flex>
        }
        Icon={EmptyFileIcon}
      />
    )
  }

  return (
    <>
      <Flex className="w-full" gap="4">
        {dateRange.map((date, i) => {
          const key = getCalendarDateLabel(date)
          const slots = slotState[key] ?? []

          return (
            <Box className="flex-1" key={`${i}-${key}`}>
              {renderSlotList({ date, slots })}
            </Box>
          )
        })}
      </Flex>
      {showMoreToggle}
    </>
  )
}
