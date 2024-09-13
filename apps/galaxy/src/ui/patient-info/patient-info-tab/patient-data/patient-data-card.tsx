'use client'

import { Flex, Grid } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { CmdInput } from './cmd-input'
import { DrivingLicensePicture } from './driving-licence-picture'
import { LicenseInput } from './license-input'
import { LicenseStateSelect } from './license-state-select'
import { MrnInput } from './mrn-input'
import { ProfilePicture } from './profile-picture'
import { SsnInput } from './ssn-input'
import { StatusSelect } from './status-select'

interface DescriptiveCardProps {
  patientId: string
}

const PatientDataCard = ({ patientId }: DescriptiveCardProps) => {
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Patient Data" />
      <Flex px="2" py="2" gap="3">
        <ProfilePicture />
        <Flex align="center" className="flex-1">
          <Grid columns="4" gap="2" width="100%">
            <MrnInput />
            <SsnInput />
            <CmdInput />
            <StatusSelect />
            <LicenseInput />
            <LicenseStateSelect />
          </Grid>
        </Flex>
        <DrivingLicensePicture />
      </Flex>
    </Flex>
  )
}

export { PatientDataCard }
