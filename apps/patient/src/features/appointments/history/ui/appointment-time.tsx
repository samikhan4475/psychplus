import React from 'react'
import {
  getDayOfWeekLabel,
  getLocalCalendarDate,
  getMonthLabel,
  getTimeLabel,
} from '@psychplus-v2/utils'
import { Text } from '@radix-ui/themes'

const AppointmentTime = ({ startDate }: { startDate: string }) => {
  return (
    <Text className="text-pp-gray-1 text-[11px] font-medium">
      {getTimeLabel(startDate).slice(0, -2)}{' '}
      {getTimeLabel(startDate).slice(-2).toLocaleLowerCase()} on{' '}
      {getMonthLabel(getLocalCalendarDate(startDate)).slice(0, 3)}{' '}
      {getLocalCalendarDate(startDate).day},{' '}
      {getDayOfWeekLabel(getLocalCalendarDate(startDate))}
    </Text>
  )
}

export default AppointmentTime
