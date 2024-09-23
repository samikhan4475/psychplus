import * as Popover from '@radix-ui/react-popover'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import format from 'date-fns/format'
import { type EventProps } from 'react-big-calendar'
import { cn } from '@/utils'
import { AppointmentEventData, AvailableSlotsEvent } from '../types/calender'
import { BookedAppointment } from '../types/schedule'
import { EditVisitDetailsButton } from './edit-visit-details-button'
import { OpenPatientChartButton } from './open-patient-chart-button'
import { VisitTypeDropdown } from './visit-type-dropdown'

// TODO: add all the VisitType enum values
enum VisitType {
  InPerson = 'in-person',
  TeleVisit = 'TeleVisit',
  Video = 'video',
  Unavailable = 'unavailable',
  Either = 'either',
}

enum AppointmentType {
  Booked = 'booked',
  Available = 'available',
}

const eventSeparatorClassIndex = {
  [VisitType.Video]: 'bg-pp-accent-mint',
  [VisitType.InPerson]: 'bg-pp-states-info',
  [VisitType.Unavailable]: 'bg-pp-states-error',
  [VisitType.Either]: 'bg-pp-states-error',
  [VisitType.TeleVisit]: 'bg-pp-states-info',
}

const eventContainerClassIndex = {
  [VisitType.Video]: 'bg-pp-green-100',
  [VisitType.InPerson]: 'bg-pp-blue-100',
  [VisitType.Unavailable]: 'bg-pp-red-100',
  [VisitType.Either]: 'bg-pp-red-100',
  [VisitType.TeleVisit]: 'bg-pp-blue-100',
}

const eventContainerClassType = {
  [AppointmentType.Booked]: 'bg-pp-green-100',
  [AppointmentType.Available]: 'bg-pp-blue-100',
}

const AppointmentEvent = ({
  event,
}: {
  event: AvailableSlotsEvent<AppointmentEventData>
}) => {
  const { visitType } = event.data as BookedAppointment
  const eventSeparatorClasses =
    eventSeparatorClassIndex[visitType as VisitType] ?? ''
  const eventContainerClasses =
    eventContainerClassIndex[visitType as VisitType] ?? ''
  const startTime = format(new Date(event.start), 'HH:mm')
  const endTime = format(new Date(event.end), 'HH:mm')
  return (
    <>
      <Box
        className={cn(
          'h-[100%] min-w-[5px] self-stretch ',
          eventSeparatorClasses,
        )}
      >
        <Text className="text-pp-black-3 text-[11px]">{`${event.title}, ${startTime} - ${endTime} `}</Text>
      </Box>
      <Box className={cn('relative', eventContainerClasses)}></Box>
    </>
  )
}

const CustomEvent = ({
  event,
}: EventProps<AvailableSlotsEvent<AppointmentEventData>>) => {
  const { appointmentType } = event.data || {}
  const startTime = format(new Date(event.start), 'HH:mm')
  const endTime = format(new Date(event.end), 'HH:mm')
  const appointmentDate = format(new Date(event.start), 'MM/dd/yyyy')
  const customDuration = `${Math.floor(
    (new Date(event.end).getTime() - new Date(event.start).getTime()) /
      (1000 * 60),
  )} mins`

  const eventContainerClasses =
    eventContainerClassType[appointmentType as AppointmentType] ?? ''

  if (appointmentType === 'booked') {
    const {
      name,
      providerName,
      state,
      service,
      locationName,
      providerType,
      visitType,
      patientConsentStatus,
      visitSequence,
      duration,
    } = event.data as BookedAppointment

    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <Flex
            className={cn(
              'bg-pp-green-100 h-[100%] w-full',
              eventContainerClasses,
            )}
            justify="start"
            align="center"
          >
            <AppointmentEvent event={event} />
          </Flex>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="bg-white data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade shadow-light-08 min-w-[535px] rounded-b-[0px] rounded-t-[12px] will-change-[transform,opacity]">
            <Flex direction="column" className="p-4">
              <Flex align="center" className="mb-2.5" justify="between">
                <Heading className="text-[20px] font-[610]">
                  Visit Details
                </Heading>
                <Flex align="center" className="gap-x-1">
                  <Text className="text-[12px] font-[510]">Visit Status</Text>
                  <VisitTypeDropdown />
                </Flex>
                <Flex align="center" className="gap-x-3">
                  <OpenPatientChartButton />
                  <EditVisitDetailsButton />
                </Flex>
              </Flex>
              <Flex className="mb-2.5 gap-x-1 text-[14px]">
                <Text className="font-[510]">{name}</Text>
                <Text className="text-pp-text-sub font-[510]">
                  {appointmentDate} {startTime}
                </Text>
              </Flex>
              <Flex className="text-[12px]" width={'74%'} justify="between">
                <Flex direction="column" className="gap-y-1">
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">State</Text>
                    <Text className="text-pp-text-sub">{state}</Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Service</Text>
                    <Text className="text-pp-text-sub">{service}</Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Provider Name</Text>
                    <Text className="text-pp-text-sub">{providerName}</Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Appointment Date</Text>
                    <Text className="text-pp-text-sub">{appointmentDate}</Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Duration</Text>
                    <Text className="text-pp-text-sub">
                      {duration ?? customDuration}
                    </Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Apt Verification</Text>
                    <Text className="text-pp-text-sub">
                      {patientConsentStatus}
                    </Text>
                  </Flex>
                </Flex>

                <Flex direction="column" className="gap-y-1">
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Location</Text>
                    <Text className="text-pp-text-sub">{locationName}</Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Provider Type</Text>
                    <Text className="text-pp-text-sub">{providerType}</Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Visit Type</Text>
                    <Text className="text-pp-text-sub">{visitType}</Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Appointment Time</Text>
                    <Text className="text-pp-text-sub">
                      {startTime + ' - ' + endTime}
                    </Text>
                  </Flex>
                  <Flex className="gap-x-1">
                    <Text className="font-[510]">Frequency</Text>
                    <Text className="text-pp-text-sub">{visitSequence}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Popover.Arrow
              className="fill-white drop-shadow-md"
              width={86}
              height={20}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  }
  return (
    <Flex
      className={cn('bg-pp-green-100 h-[100%] w-full', eventContainerClasses)}
      justify="start"
      align="center"
    >
      <AppointmentEvent event={event} />
    </Flex>
  )
}

export { CustomEvent }
