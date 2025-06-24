'use client'

import { getLocalTimeZone, isToday } from '@internationalized/date'
import { Appointment } from '@psychplus-v2/types'
import {
  getDayOfWeekLabel,
  getLocalCalendarDate,
  getMonthLabel,
  getTimeLabel
} from '@psychplus-v2/utils'
import { DashIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

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

  const appointmentDate = getLocalCalendarDate(row.startDate)

  return (
    <Flex mt="1" >
      <Text className="text-[15px] font-[600] text-accent-12">
        {getTimeLabel(row.startDate).slice(0, -2)}{' '}
        <Text weight="regular">
          {getTimeLabel(row.startDate).slice(-2).toLocaleLowerCase()}
        </Text>
      </Text>

      <DashIcon height="20" width="20" />

      {isToday(appointmentDate, getLocalTimeZone()) ? (
        <Text>Today</Text>
      ) : (
        <Text className="text-[15px] font-[600] text-accent-12">
          {getMonthLabel(appointmentDate).slice(0, 3)} {appointmentDate.day}{' '}
          <Text weight="regular">{getDayOfWeekLabel(appointmentDate)}</Text>
        </Text>
      )}
    </Flex>
  )
}

export { AppointmentTimeLabel }
