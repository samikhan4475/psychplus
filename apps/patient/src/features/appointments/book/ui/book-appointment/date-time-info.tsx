'use client'

import { CalendarDate } from '@internationalized/date'
import {
  getDayOfWeekLabel,
  getMonthLabel,
  getTimeLabel,
} from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { Slot } from '@psychplus/appointments'
import { AcsInfo } from '@/features/call/types'

interface DateTimeInfoProps {
  slotDate: CalendarDate
  isSlotToday: boolean
  slot: Slot
  acsInfo: AcsInfo
  isCall?: boolean
  appointmentId?: string | null
  isUnAuthenticated?: boolean
}

interface TextWithCallStyleProps {
  children: React.ReactNode
  isCall?: boolean
}

interface DateDisplayProps {
  slotDate: CalendarDate
  isSlotToday: boolean
  isCall?: boolean
}

interface VisitIdDisplayProps {
  appointmentId?: string | null
}
interface TimeDisplayProps {
  timeLabel: string
  isCall?: boolean
}

const TextWithCallStyle = ({ children, isCall }: TextWithCallStyleProps) => (
  <Text
    className={isCall ? 'text-[#1C2024]' : ''}
    size={isCall ? '2' : undefined}
  >
    {children}
  </Text>
)

const DateDisplay = ({ slotDate, isSlotToday, isCall }: DateDisplayProps) => {
  if (isSlotToday) {
    return <TextWithCallStyle isCall={isCall}>Today</TextWithCallStyle>
  }

  return (
    <>
      <TextWithCallStyle isCall={isCall}>
        {getDayOfWeekLabel(slotDate).slice(0, 3)},
      </TextWithCallStyle>
      <TextWithCallStyle isCall={isCall}>
        {getMonthLabel(slotDate).slice(0, 3)}
      </TextWithCallStyle>
      <TextWithCallStyle isCall={isCall}>{slotDate.day}</TextWithCallStyle>
    </>
  )
}

const TimeDisplay = ({ timeLabel, isCall }: TimeDisplayProps) => (
  <TextWithCallStyle isCall={isCall}>- {timeLabel}</TextWithCallStyle>
)

const VisitIdDisplay = ({ appointmentId }: VisitIdDisplayProps) => (
  <>
    <Text className="text-[#1C2024]" size="2">
      -{' '}
    </Text>
    <Text className="text-[#1C2024]" size="2">
      Visit ID: {appointmentId}
    </Text>
  </>
)

const DateTimeInfo = ({
  slotDate,
  isSlotToday,
  slot,
  acsInfo,
  isCall,
  appointmentId,
}: DateTimeInfoProps) => {
  const timeLabel = isCall
    ? getTimeLabel(String(acsInfo?.paymentData?.appointmentDateTime))
    : getTimeLabel(slot.startDate)
    
  return (
    <Flex
      className="text-[14px] text-[#24366B] md:text-[18px]"
      direction="row"
      gap="2"
      align="center"
    >
      <Flex direction="row" gap="1">
        <DateDisplay
          slotDate={slotDate}
          isSlotToday={isSlotToday}
          isCall={isCall}
        />
        <TimeDisplay timeLabel={timeLabel} isCall={isCall} />
        {isCall && appointmentId && (
          <VisitIdDisplay appointmentId={appointmentId} />
        )}
      </Flex>
    </Flex>
  )
}

export default DateTimeInfo
