import * as Popover from '@radix-ui/react-popover'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { type EventProps } from 'react-big-calendar'
import { cn } from '@/utils'
import { AvailableSlotsEvent, AvailableSlotsMock } from '../types'
import { EditVisitDetailsButton } from './edit-visit-details-button'
import { OpenPatientChartButton } from './open-patient-chart-button'
import { VisitTypeDropdown } from './visit-type-dropdown'

enum VisitType {
  InPerson = 'in-person',
  Video = 'video',
  Unavailable = 'unavailable',
}

const eventSeparatorClassIndex = {
  [VisitType.Video]: 'bg-pp-accent-mint',
  [VisitType.InPerson]: 'bg-pp-states-info',
  [VisitType.Unavailable]: 'bg-pp-states-error',
}

const eventContainerClassIndex = {
  [VisitType.Video]: 'bg-pp-green-100',
  [VisitType.InPerson]: 'bg-pp-blue-100',
  [VisitType.Unavailable]: 'bg-pp-red-100',
}

const AppointmentEvent = ({
  event,
}: {
  event: AvailableSlotsEvent<AvailableSlotsMock>
}) => {
  const eventSeparatorClasses = eventSeparatorClassIndex[event.data.type] ?? ''
  const eventContainerClasses = eventContainerClassIndex[event.data.type] ?? ''

  return (
    <>
      <Box
        className={cn(
          'h-[100%] min-w-[5px] self-stretch',
          eventSeparatorClasses,
        )}
      ></Box>
      <Box className={cn('relative', eventContainerClasses)}></Box>
    </>
  )
}

const CustomEvent = ({
  event,
}: EventProps<AvailableSlotsEvent<AvailableSlotsMock>>) => {
  const eventContainerClasses = eventContainerClassIndex[event.data.type] ?? ''

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
              <Text className="font-[510]">Marina, Robert</Text>
              <Text className="text-pp-text-sub font-[510]">4/03/24 00:00</Text>
            </Flex>
            <Flex className="text-[12px]" width={'74%'} justify="between">
              <Flex direction="column" className="gap-y-1">
                <Flex className="gap-x-1">
                  <Text className="font-[510]">State</Text>
                  <Text className="text-pp-text-sub">Texas</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Service</Text>
                  <Text className="text-pp-text-sub">Initial appointment</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Provider Name</Text>
                  <Text className="text-pp-text-sub">Dr. John Smith</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Appointment Date</Text>
                  <Text className="text-pp-text-sub">4/03/24</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Duration</Text>
                  <Text className="text-pp-text-sub">60 mins</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Apt Verification</Text>
                  <Text className="text-pp-text-sub">Pending</Text>
                </Flex>
              </Flex>

              <Flex direction="column" className="gap-y-1">
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Location</Text>
                  <Text className="text-pp-text-sub">Willowbrookclinic</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Provider Type</Text>
                  <Text className="text-pp-text-sub">Therapist</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Visit Type</Text>
                  <Text className="text-pp-text-sub">
                    New Pt, Psychotherapy
                  </Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Appointment Time</Text>
                  <Text className="text-pp-text-sub">05:00- 05:20</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Frequency</Text>
                  <Text className="text-pp-text-sub">Once</Text>
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

export { CustomEvent }
