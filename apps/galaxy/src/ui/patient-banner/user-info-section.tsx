'use client'

import { Flex } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { PatientProfile, PhoneNumber } from '@/types'
import {
  getAgeFromDate,
  getCalendarDate,
  getCodesetDisplayName,
  getMaskedPhoneNumber,
  getPatientCity,
  getPatientPhone,
  getPatientPostalCode,
  getPatientState,
  getPatientStreet,
  getSlashedPaddedDateString,
  getUserFullName,
} from '@/utils'
import { LabelAndValue } from './label-and-value'

interface PatientBannerProps {
  user: PatientProfile
}

const UserInfoSection = ({ user }: PatientBannerProps) => {
  const statusOptions = useCodesetOptions(CODESETS.CustomerStatus)
  const languageCodes = useCodesetCodes(CODESETS.Language)
  const patientStatus = statusOptions?.find(
    (item) => item?.value === user.status,
  )

  const address = `
            ${
              user?.contactDetails?.addresses
                ? getPatientStreet(user?.contactDetails?.addresses)
                : undefined
            }
                ${getPatientCity(
                  user?.contactDetails?.addresses,
                )}, ${getPatientState(
    user?.contactDetails?.addresses,
  )} ${getPatientPostalCode(user?.contactDetails?.addresses)}
            
         `

  return (
    <>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue
          label="Identity"
          value={
            user?.legalName?.firstName
              ? `${getUserFullName(user.legalName)} ${getAgeFromDate(
                  getCalendarDate(user.birthdate),
                )} yo ${user?.gender?.charAt(0)}`
              : ''
          }
        />
        <LabelAndValue
          label="Language"
          value={
            user?.language
              ? getCodesetDisplayName(user.language, languageCodes)
              : undefined
          }
        />
        <LabelAndValue label="User Status" value={patientStatus?.label} />
        <LabelAndValue label="MRN" value={user.medicalRecordNumber} />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue
          label="DOB"
          value={getSlashedPaddedDateString(user.birthdate, true)}
        />
        <LabelAndValue
          label="Cell"
          value={getMaskedPhoneNumber(
            getPatientPhone(
              user?.contactDetails?.phoneNumbers as PhoneNumber[],
            ) as string,
          )}
        />
        <LabelAndValue label="Email" value={user?.contactDetails?.email} />
        <LabelAndValue label="Address" value={address} showValueInsideTooltip />
      </Flex>
    </>
  )
}

export { UserInfoSection }
