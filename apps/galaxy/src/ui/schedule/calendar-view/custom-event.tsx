import { useMemo } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import format from 'date-fns/format'
import { type EventProps } from 'react-big-calendar'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { cn, getCodesetDisplayName } from '@/utils'
import { AvailableSlotsEvent } from '../types'
import { EditVisitDetailsButton } from './edit-visit-details-button'
import { OpenPatientChartButton } from './open-patient-chart-button'
import { VisitStatusDropdown } from './visit-status-dropdown'

// TODO: add all the VisitType enum values
enum VisitType {
  InPerson = 'InPerson',
  TeleVisit = 'TeleVisit',
  Unavailable = 'unavailable',
}

const eventSeparatorClassIndex = {
  [VisitType.InPerson]: 'bg-pp-accent-mint',
  [VisitType.Unavailable]: 'bg-pp-states-error',
  [VisitType.TeleVisit]: 'bg-pp-states-info',
}

const eventContainerClassIndex = {
  [VisitType.InPerson]: 'bg-pp-green-100',
  [VisitType.Unavailable]: 'bg-pp-red-100',
  [VisitType.TeleVisit]: 'bg-pp-blue-100',
}

const AppointmentEvent = ({
  event,
}: {
  event: AvailableSlotsEvent<Appointment>
}) => {
  const { visitMedium, name } = event.data as Appointment
  const eventSeparatorClasses =
    eventSeparatorClassIndex[visitMedium as VisitType] ?? ''
  const eventContainerClasses =
    eventContainerClassIndex[visitMedium as VisitType] ?? ''
  const startTime = format(new Date(event.start), 'HH:mm')
  const endTime = format(new Date(event.end), 'HH:mm')

  return (
    <>
      <Box
        className={cn(
          'bg-pp-blue-100 h-[100%] min-w-[5px] self-stretch',
          eventSeparatorClasses,
        )}
      ></Box>
      <Box className={cn('relative w-full', eventContainerClasses)}>
        <Text className="text-pp-black-3 truncate text-[11px]">{`${name}, ${startTime} - ${endTime}`}</Text>
      </Box>
    </>
  )
}

const CustomEvent = ({
  event,
}: EventProps<AvailableSlotsEvent<Appointment>>) => {
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)
  const frequencyCodes = useCodesetCodes(CODESETS.VisitRepeatFrequency)
  const verificationStatusCodes = useCodesetCodes(CODESETS.VerificationStatus)
  const startTime = format(new Date(event.start), 'HH:mm')
  const endTime = format(new Date(event.end), 'HH:mm')
  const appointmentDate = format(new Date(event.start), 'MM/dd/yyyy')
  const customDuration = `${Math.floor(
    (new Date(event.end).getTime() - new Date(event.start).getTime()) /
      (1000 * 60),
  )} mins`

  const {
    appointmentId,
    name,
    providerName,
    stateCode,
    locationName,
    providerType,
    visitType,
    patientInsuranceVerificationStatus,
  } = event.data as Appointment
  const state = useMemo(
    () => getCodesetDisplayName(stateCode, stateCodes),
    [stateCode],
  )
  const service = useMemo(
    () => getCodesetDisplayName(event.data.service, serviceCodes),
    [event.data.service],
  )
  const frequency = useMemo(() => {
    const transformedFrequencyCodes = frequencyCodes.map((code) => {
      const value = code?.attributes?.find((attr) => attr.name === 'ResourceId')
        ?.value as string
      return {
        ...code,
        value: value,
      }
    })
    return getCodesetDisplayName(
      `${event.data.appointmentInterval}`,
      transformedFrequencyCodes,
    )
  }, [event.data.appointmentInterval, frequencyCodes])

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Flex
          className="bg-pp-green-100 h-[100%] w-full"
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
                <Text className="whitespace-nowrap text-[12px] font-[510]">
                  Visit Status
                </Text>
                <VisitStatusDropdown appointment={event.data} />
              </Flex>
              <Flex align="center" className="gap-x-3">
                <OpenPatientChartButton
                  appointment={event.data as Appointment}
                />
                <EditVisitDetailsButton appointmentId={appointmentId} />
              </Flex>
            </Flex>
            <Flex className="mb-2.5 gap-x-1 text-[14px]">
              <Text className="font-[510]">{name}</Text>
              <Text className="text-pp-text-sub font-[510]">
                {appointmentDate} {startTime}
              </Text>
            </Flex>
            <Flex className="gap-x-7 text-[12px]">
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
                  <Text className="text-pp-text-sub">{customDuration}</Text>
                </Flex>
                <Flex className="gap-x-1">
                  <Text className="font-[510]">Ins Verification</Text>
                  <Text className="text-pp-text-sub">
                    {getCodesetDisplayName(
                      patientInsuranceVerificationStatus,
                      verificationStatusCodes,
                    )}
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
                  <Text className="text-pp-text-sub">{frequency}</Text>
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
