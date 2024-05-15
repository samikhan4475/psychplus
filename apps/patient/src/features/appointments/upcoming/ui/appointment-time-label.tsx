'use client'

import { useEffect, useState } from 'react'
import { getLocalTimeZone, isToday } from '@internationalized/date'
import { Appointment } from '@psychplus-v2/types'
import {
  getCalendarDate,
  getDayOfWeekLabel,
  getMonthLabel,
  getTimeLabel,
} from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'

interface AppointmentTimeLabelProps {
  appointment: Appointment
}

const AppointmentTimeLabel = ({
  appointment: row,
}: AppointmentTimeLabelProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const appointmentDate = getCalendarDate(row.startDate)

  return (
    <Flex gap={{ initial: '2', xs: '5' }} mt="1">
      <Text className="text-[15px] font-[600] text-accent-12">
        {getTimeLabel(row.startDate)}
      </Text>

      {isToday(appointmentDate, getLocalTimeZone()) ? (
        <Text>Today</Text>
      ) : (
        <Text className="text-[15px] font-[600] text-accent-12">
          {getMonthLabel(appointmentDate).slice(0, 3)} {appointmentDate.day}{' '}
          {getDayOfWeekLabel(appointmentDate)}
        </Text>
      )}
    </Flex>
  )
}

export { AppointmentTimeLabel }
