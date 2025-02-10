'use client'

import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientProfile, PhoneNumber } from '@/types'
import {
  getAgeFromDate,
  getCalendarDate,
  getMaskedPhoneNumber,
  getMaskedSSN,
  getPatientPhone,
  getSlashedPaddedDateString,
  getUserFullName,
} from '@/utils'
import { useStore } from '../vitals'
import { LabelAndValue } from './label-and-value'

interface PatientBannerProps {
  user: PatientProfile
}

const UserInfoSection = ({ user }: PatientBannerProps) => {
  const { data } = useStore()
  const vital = useMemo(
    () => (data && data?.length > 0 ? data?.[0] : null),
    [data],
  )

  const statusOptions = useCodesetOptions(CODESETS.CustomerStatus)
  const patientStatus = statusOptions?.find(
    (item) => item?.value === user.status,
  )
  const formatBloodPressure = (systolic?: number, diastolic?: number) =>
    systolic && diastolic ? `${systolic}/${diastolic}` : undefined

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
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="Language" value={user.language} />
        <LabelAndValue label="Status" value={patientStatus?.label} />
        <LabelAndValue label="MRN" value={user.medicalRecordNumber} />
        <LabelAndValue
          label="DOB"
          value={getSlashedPaddedDateString(user.birthdate, true)}
        />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue
          label="Cell"
          value={getMaskedPhoneNumber(
            getPatientPhone(
              user?.contactDetails?.phoneNumbers as PhoneNumber[],
            ) as string,
          )}
        />
        <LabelAndValue label="Email" value={user?.contactDetails?.email} />
        <LabelAndValue
          label="SSN"
          value={getMaskedSSN(user.socialSecurityNumber)}
        />
        <LabelAndValue
          label="BP"
          value={formatBloodPressure(vital?.systolic, vital?.diastolic)}
        />
      </Flex>
    </>
  )
}

export { UserInfoSection }
