import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType } from '@/types'
import { getTimeZoneAbbreviation } from '@/ui/schedule/utils'
import { convertToTimezone } from '@/ui/visit/utils'
import { getSlashedPaddedDateString } from '@/utils'
import { PatientInformationBlockProps } from '../types'

const LabelField = ({ label, value }: SelectOptionType) => {
  return (
    <Flex className=" gap-1 px-3">
      <Text size="1" weight="medium">
        {label}
      </Text>
      <Text size="1" weight="medium" className=" text-slate-9">
        {value}
      </Text>
    </Flex>
  )
}
function PatientInformationBlock({
  appointment,
}: PatientInformationBlockProps) {
  const { date, time } = convertToTimezone(
    appointment?.appointmentDate,
    appointment?.locationTimezoneId,
  )
  const timeZoneCodeSets = useCodesetCodes(CODESETS.TimeZoneId).filter(
    (code) => code.groupingCode === 'US',
  )
  const locationTimeZoneAbbreviation = getTimeZoneAbbreviation(
    appointment ? appointment.locationTimezoneId : '',
    timeZoneCodeSets,
  )
  return (
    <Flex className=" flex-wrap gap-2">
      <LabelField label="Patient Name" value={appointment.name} />
      <LabelField label="Visit Type" value={appointment.visitType} />
      <LabelField
        label="Visit Date/Time"
        value={`${getSlashedPaddedDateString(
          date,
        )} ${time} (${locationTimeZoneAbbreviation})`}
      />
      <LabelField label="Visit Location" value={appointment.locationName} />
      <LabelField label="Provider" value={appointment.providerName} />
      <LabelField
        label="Phone Number"
        value={appointment.patientPhoneNumber?.number || ''}
      />
    </Flex>
  )
}

export default PatientInformationBlock
