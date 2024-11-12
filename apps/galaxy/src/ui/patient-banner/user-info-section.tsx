import { Flex } from '@radix-ui/themes'
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

interface PatientBannerProps {
  user: PatientProfile
}

const UserInfoSection = async ({ user }: PatientBannerProps) => {
  return (
    <>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="Name" value={getUserFullName(user.legalName)} />
        <LabelAndValue
          label="Age/Gender"
          value={`${getAgeFromDate(getCalendarDate(user.birthdate))} yo/${
            user.gender
          }`}
        />
        <LabelAndValue label="Orientation" value={user.genderOrientation} />
        <LabelAndValue label="Pronouns" value={user.genderPronoun} />
        <LabelAndValue label="Language" value={user.language} />
        <LabelAndValue label="Status" value={user.status} />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="MRN" value={user.medicalRecordNumber} />
        <LabelAndValue
          label="DOB"
          value={getSlashedPaddedDateString(user.birthdate)}
        />
        <LabelAndValue
          label="Cell"
          value={getMaskedPhoneNumber(
            getPatientPhone(
              user.contactDetails?.phoneNumbers as PhoneNumber[],
            ) as string,
          )}
        />
        <LabelAndValue label="Email" value={user.contactDetails?.email} />
        <LabelAndValue label="SSN" value={user.socialSecurityNumber} />
      </Flex>
    </>
  )
}

export { UserInfoSection }
