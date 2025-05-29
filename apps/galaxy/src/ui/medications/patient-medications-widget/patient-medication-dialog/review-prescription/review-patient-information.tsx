'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { PatientProfile } from '@/types'
import {
  getAgeFromDate,
  getMaskedPhoneNumber,
  getPatientFullName,
  getSlashedDateString,
} from '@/utils'
import { Prescription } from '../../types'
import {
  formatHeightWeight,
  getPatientProfileAddress,
  getPatientProfilePhone,
} from '../../utils'
import { ReviewLabel } from '../shared'
import { parseDate } from '@internationalized/date'
interface ReviewPatientInformationProps {
  patientProfile?: PatientProfile
  loading: boolean
  prescriptions?: Prescription[]
}

const ReviewPatientInformation = ({
  patientProfile,
  loading,
  prescriptions,
}: ReviewPatientInformationProps) => {
  const address = getPatientProfileAddress(patientProfile)
  const phoneNumber = getPatientProfilePhone(patientProfile)
  const prescriptionsHeight = prescriptions?.[0]?.patientHeight
  const prescriptionsWeight = prescriptions?.[0]?.patientWeight
  const age = patientProfile?.birthdate
    ? getAgeFromDate(parseDate(patientProfile?.birthdate))
    : null
  return (
    <Flex direction="column" className="overflow-hidden rounded-2  shadow-3">
      <Box className="bg-pp-bg-accent px-2 py-0.5">
        <Text size="2" weight="medium">
          Patient Information
        </Text>
      </Box>
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <Flex gap="2" className="px-3 py-2" wrap="wrap">
          <ReviewLabel
            title="Patient Name"
            value={
              patientProfile?.legalName &&
              getPatientFullName(patientProfile?.legalName)
            }
          />
          <ReviewLabel
            title="DOB"
            value={getSlashedDateString(String(patientProfile?.birthdate))}
          />
          <ReviewLabel title="Gender" value={patientProfile?.gender} />
          <ReviewLabel title="Cell" value={getMaskedPhoneNumber(phoneNumber)} />
          <ReviewLabel title="Address" value={address} />
          {age !== null &&
          age <= 18 &&
          (prescriptionsHeight || prescriptionsWeight) ? (
            <ReviewLabel
              title="Height/Weight"
              value={formatHeightWeight(
                prescriptionsHeight,
                prescriptionsWeight,
              )}
            />
          ) : null}
        </Flex>
      )}
    </Flex>
  )
}

export { ReviewPatientInformation }
