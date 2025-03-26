import { Flex } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientProfile, PhoneNumber } from '@/types'
import {
  getAgeFromDate,
  getCalendarDate,
  getMaskedPhoneNumber,
  getPatientPhone,
  getSlashedPaddedDateString,
  getUserFullName,
} from '@/utils'
import { LabelAndValue } from './label-and-value'

interface PatientCardInfoProps {
  patient: PatientProfile
}

const PatientCardInfoSection = ({ patient }: PatientCardInfoProps) => {
  const statusOptions = useCodesetOptions(CODESETS.CustomerStatus)
  const patientStatus = statusOptions?.find(
    (item) => item?.value === patient?.status,
  )

  return (
    <>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue
          label="Name"
          value={getUserFullName(patient?.legalName)}
        />
        <LabelAndValue
          label="Age/Gender"
          value={`${getAgeFromDate(getCalendarDate(patient?.birthdate))} yo/${
            patient?.gender
          }`}
        />
        <LabelAndValue label="Orientation" value={patient?.genderOrientation} />
        <LabelAndValue label="Pronouns" value={patient?.genderPronoun} />
        <LabelAndValue label="Language" value={patient?.language} />
        <LabelAndValue label="Status" value={patientStatus?.label ?? 'NA'} />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="MRN" value={patient?.medicalRecordNumber} />
        <LabelAndValue
          label="DOB"
          value={getSlashedPaddedDateString(patient?.birthdate, true)} //pass params to get 4 digits on year
        />
        <LabelAndValue
          label="Cell"
          value={getMaskedPhoneNumber(
            getPatientPhone(
              patient?.contactDetails?.phoneNumbers as PhoneNumber[],
            ) as string,
          )}
        />
        <LabelAndValue label="Email" value={patient?.contactDetails?.email} />
        <LabelAndValue label="SSN" value={patient?.socialSecurityNumber} />
      </Flex>
    </>
  )
}

export { PatientCardInfoSection }
