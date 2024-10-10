import { Avatar, Flex, Text } from '@radix-ui/themes'
import { GET_PATIENT_PROFILE_IMAGE_ENDPOINT, getPatientProfile } from '@/api'
import { PatientAddress, PhoneNumber } from '@/types'
import {
  cn,
  getAgeFromDate,
  getCalendarDate,
  getMaskedPhoneNumber,
  getPatientCity,
  getPatientMainAddress,
  getPatientPhone,
  getPatientPostalCode,
  getPatientState,
  getSlashedPaddedDateString,
  getUserFullName,
} from '@/utils'

interface PatientBannerProps {
  patientId: string
}

const PatientBanner = async ({ patientId }: PatientBannerProps) => {
  const response = await getPatientProfile(patientId)

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const user = response.data

  console.log(GET_PATIENT_PROFILE_IMAGE_ENDPOINT(String(user.id)))

  return (
    <Flex
      gap="3"
      py="4"
      px="5"
      wrap="wrap"
      direction={{
        md: 'row',
      }}
      justify="start"
      className="bg-white border-b border-b-gray-5"
    >
      <Flex mr="6">
        <Avatar
          src={
            user.hasPhoto
              ? `/ehr/api/patients/${user.id}/profileimage`
              : undefined
          }
          fallback="NA"
          size="7"
          highContrast
        />
      </Flex>
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
        <LabelAndValue label="Allergies" />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="BP" />
        <LabelAndValue label="HR" />
        <LabelAndValue label="Temp (F)" />
        <LabelAndValue label="Height (in)" />
        <LabelAndValue label="Weight (lbs)" />
        <LabelAndValue label="BMI" />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="CC on file" />
        <LabelAndValue label="Verify" />
        <LabelAndValue label="Primary Ins" />
        <LabelAndValue label="Secondary Ins" />
        <LabelAndValue
          label="Address"
          value={getPatientMainAddress(
            user.contactDetails.addresses as PatientAddress[],
          )}
        />
        <LabelAndValue
          label="City/State/Zip"
          value={`${getPatientCity(
            user.contactDetails.addresses as PatientAddress[],
          )}, ${getPatientState(
            user.contactDetails.addresses as PatientAddress[],
          )} ${getPatientPostalCode(
            user.contactDetails.addresses as PatientAddress[],
          )}`}
        />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="Psychiatrist" />
        <LabelAndValue label="Therapist" />
        <LabelAndValue label="PCP" />
        <LabelAndValue label="Pharmacy Name" />
        <LabelAndValue label="Pharmacy Address" />
        <LabelAndValue label="Pharm City/State/Zip" />
      </Flex>
    </Flex>
  )
}

interface LabelAndValueProps {
  label: string
  value?: string
}

const LabelAndValue = ({ label, value }: LabelAndValueProps) => (
  <Flex gap="1" className="whitespace-nowrap">
    <Text className="text-[11.5px] font-[600]">{label}</Text>
    <Text
      className={cn('text-[11.5px]', {
        'italic text-gray-9': !value,
      })}
    >
      {value ?? 'N/A'}
    </Text>
  </Flex>
)

export { PatientBanner }
