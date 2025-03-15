'use client'

import { Flex, Grid } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  GET_PATIENT_DRIVER_LICENSE_IMAGE_ENDPOINT,
  GET_PATIENT_PROFILE_IMAGE_ENDPOINT,
} from '@/api/endpoints'
import { CardHeading } from '@/components'
import { PatientInfoSchemaType } from '../patient-info-schema'
import { CmdInput } from './cmd-input'
import { DrivingLicensePicture } from './driving-licence-picture'
import { LicenseInput } from './license-input'
import { LicenseStateSelect } from './license-state-select'
import { MrnInput } from './mrn-input'
import { ProfilePicture } from './profile-picture'
import { ReferralOrganizationInput } from './referral-organization-input'
import { ReferralSource } from './referral-source'
import { SsnInput } from './ssn-input'
import { StatusSelect } from './status-select'

interface DescriptiveCardProps {
  patientId: string
  setDriverLicenseImage: (file: File | undefined) => void
  setProfileImage: (file: File | undefined) => void
}

const PatientDataCard = ({
  patientId,
  setDriverLicenseImage,
  setProfileImage,
}: DescriptiveCardProps) => {
  const form = useFormContext<PatientInfoSchemaType>()
  const savedDriverLicenseUrl = form.watch('driversLicense.hasFrontImage')
    ? GET_PATIENT_DRIVER_LICENSE_IMAGE_ENDPOINT(patientId, 'front')
    : ''

  const savedProfileImageUrl = form.watch('hasPhoto')
    ? GET_PATIENT_PROFILE_IMAGE_ENDPOINT(patientId)
    : ''

  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Patient Data" />
      <Flex px="2" py="2" gap="3">
        <ProfilePicture
          setProfileImage={setProfileImage}
          savedProfileImageUrl={savedProfileImageUrl}
        />
        <Flex align="center" className="flex-1">
          <Grid columns="4" gap="2" width="100%">
            <MrnInput />
            <SsnInput />
            <CmdInput />
            <StatusSelect />
            <LicenseInput />
            <LicenseStateSelect />
            <ReferralSource />
            <ReferralOrganizationInput />
          </Grid>
        </Flex>
        <DrivingLicensePicture
          setDriverLicenseImage={setDriverLicenseImage}
          savedDriverLicenseUrl={savedDriverLicenseUrl}
        />
      </Flex>
    </Flex>
  )
}

export { PatientDataCard }
