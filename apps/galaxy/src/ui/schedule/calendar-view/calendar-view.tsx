'use client'

import { Flex, IconButton, Text } from '@radix-ui/themes'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import { Calendar, dateFnsLocalizer, EventProps } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React, { useState } from 'react'
import { getLocalTimeZone } from '@internationalized/date'
import { PlusIcon } from '@/components/icons'
import { CalendarFilterCard } from './calendar-filter-card'
import { CustomEvent } from './custom-event'
import './styles.css'
import { AddVisit } from '@/ui/visit/add-visit'
import {
  AppointmentEventData,
  AvailableSlotsEvent,
} from '../types/calender'
import { useDropdownContext } from '../context'
import { useStore } from '../store'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

type DateLocalizerType = typeof localizer

interface DateLocalizerInterface {
  date: Date
  localizer: DateLocalizerType
}

// @ts-ignore
const   CustomTimeSlot = (props) => {
  const [showButton, setShowButton] = useState<boolean>(false)
  const { usStates } = useDropdownContext()

  if (props.resource === undefined) return props.children

  return (
    <Flex
      justify="end"
      className="relative"
      flexGrow="1"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      {showButton && (
        <AddVisit states={usStates}>
          <IconButton
            variant="ghost"
            className="bg-pp-primary-light absolute right-0 top-0 z-[200] h-5 w-5 translate-x-[-25%] translate-y-[25%] rounded-[0px] p-0.5"
          >
            <PlusIcon />
          </IconButton>
        </AddVisit>
      )}
    </Flex>
  )
}

const CalendarComponent = {
  timeSlotWrapper: CustomTimeSlot,
  event: (
    props: React.JSX.IntrinsicAttributes &
      EventProps<AvailableSlotsEvent<AppointmentEventData>>,
  ) => <CustomEvent {...props} />,

  week: {
    header: ({ date, localizer }: DateLocalizerInterface) => {
      const dayName = localizer.format(date, 'EEE')
      const dayNumber = localizer.format(date, 'd')
      return (
        <Flex
          align="center"
          className="gap-x-2 align-middle text-[14px]"
          position="sticky"
          top="0"
        >
          <Text>{dayName}</Text>
          <Flex
            align="center"
            justify="center"
            className="bg-pp-bg-primary text-white h-7 w-7 rounded-[50%]"
          >
            {dayNumber}
          </Flex>
        </Flex>
      )
    },
  },
}

const formats = {
  timeGutterFormat: 'hh a',
}

const CalendarView = () => {
  const [slots, setSlots] = useState<
    AvailableSlotsEvent<AppointmentEventData>[]
  >([])

  const { weekStartDate } = useStore((state) => ({
    weekStartDate: state.weekStartDate,
  }))

  return (
    <>
      <CalendarFilterCard setSlots={setSlots} />
      <Flex direction="column" className="mt-1.5 flex-1 overflow-y-auto" px="5">
        <Flex direction="column" className="h-full">
          <Calendar
            localizer={localizer}
            view="week"
            toolbar={false}
            events={slots}
            components={CalendarComponent}
            startAccessor="start"
            endAccessor="end"
            formats={formats}
            dayLayoutAlgorithm="no-overlap"
            date={weekStartDate.toDate(getLocalTimeZone())}
          />
        </Flex>
      </Flex>
    </>
  )
}

export { CalendarView }
