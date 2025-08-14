import { useMemo } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Box, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { convertToZonedDate } from '@/ui/schedule/utils'
import { getCodesetDisplayName } from '@/utils'

interface PermissionAlertProps {
  isOpen: boolean
  appointment: Appointment
  onClose: () => void
  showHeading?: boolean
}

const ViewVisitPopup = ({
  appointment,
  isOpen,
  onClose,
}: PermissionAlertProps) => {
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)
  const frequencyCodes = useCodesetCodes(CODESETS.VisitRepeatFrequency)
  const verificationStatusCodes = useCodesetCodes(CODESETS.VerificationStatus)

  const {
    name,
    providerName,
    stateCode,
    locationName,
    providerType,
    visitType,
    appointmentDuration,
    patientInsuranceVerificationStatus,
  } = appointment as Appointment

  const start = convertToZonedDate(
    appointment.appointmentDate,
    appointment.locationTimezoneId,
  )
  const end = new Date(start.getTime() + appointmentDuration * 60000)

  const startTime = format(new Date(start), 'HH:mm')
  const endTime = format(new Date(end), 'HH:mm')
  const appointmentDate = format(new Date(start), 'MM/dd/yy')

  const state = useMemo(
    () => getCodesetDisplayName(stateCode, stateCodes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stateCode],
  )
  const service = useMemo(
    () => getCodesetDisplayName(appointment.service, serviceCodes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appointment.service],
  )
  const frequency = useMemo(() => {
    const transformedFrequencyCodes = frequencyCodes.map((code) => {
      return {
        ...code,
        value: code.value,
      }
    })
    return getCodesetDisplayName(
      `${appointment.visitFrequency}`,
      transformedFrequencyCodes,
    )
  }, [appointment.visitFrequency, frequencyCodes])

  const onOpenChange = (open: boolean): void => {
    if (!open) onClose()
  }

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content className="w-full">
        <Flex gap="3">
          <Flex direction="column" className="p-4">
            <AlertDialog.Title className="pt-1">
              Visit Details
            </AlertDialog.Title>

            <Flex className="mb-2.5 gap-x-1 text-[14px]">
              <Text className="font-[510]">{name}</Text>
              <Text className="text-pp-text-sub font-[510]">
                {appointmentDate}
                <Text className="ml-1 cursor-pointer">{startTime}</Text>
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
                  <Text className="text-pp-text-sub">
                    {appointmentDuration} mins
                  </Text>
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
                  <Text className="text-pp-text-sub cursor-pointer">
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

          <Box className="flex-1">
            <AlertDialog.Cancel
              className="min-w-5 min-h-5 ml-auto cursor-pointer"
              onClick={onClose}
            >
              <Cross1Icon strokeWidth={1.5} className="text-pp-icon-sub" />
            </AlertDialog.Cancel>
          </Box>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export { ViewVisitPopup }
