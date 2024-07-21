'use client'

import { useEffect, useState } from 'react'
import { Avatar, Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { CODE_NOT_SET } from '@psychplus/codeset'
import {
  getPatientDriverLicenseImage,
  getPatientProfileImageByStaff,
} from '@psychplus/patient/api.client'
import { PictureFallback } from '@psychplus/ui/icons'
import { usePatientHistoryContext } from '../../context'
import { useCustomerStatusIndex, useUsStatesIndex } from '../../hooks'
import { useStore } from '../../store'
import { LabelledText } from './text-and-label'

const PatientData = () => {
  const data = useStore((state) => state.patient)
  const [profileImage, setProfileImage] = useState<string>('')
  const [driverLicenseImage, setDriverLicenseImage] = useState<string>('')
  const { profileHistory } = usePatientHistoryContext()
  const customerStatusIndex = useCustomerStatusIndex()
  const usStatesIndex = useUsStatesIndex()
  const homeAddress = profileHistory.contactDetails?.addresses?.find(
    (address) => address.type === 'Home',
  )

  useEffect(() => {
    if (!data?.id) return
    if (data.hasPhoto) {
      getPatientProfileImageByStaff(data?.id).then(setProfileImage)
    }
    if (data?.driversLicense?.hasFrontImage) {
      getPatientDriverLicenseImage(data?.id, 'front').then(
        setDriverLicenseImage,
      )
    }
  }, [data?.id, data?.driversLicense?.hasFrontImage, data?.hasPhoto])

  return (
    <Flex direction="column">
      <Heading size="3" className="pb-1 pl-2 pt-2">
        Patient Data
      </Heading>
      <Flex className="justify-between bg-[#FFFF] py-2 pr-2" gap="4">
        <Flex direction="column">
          <Text className="pl-2 pb-1 text-[12px] font-medium">Profile Picture</Text>
          <Avatar
            size="8"
            color="gray"
            src={profileImage}
            fallback={
              <Box>
                <PictureFallback width={110} height={150} />
              </Box>
            }
            className="mb-2 p-2"
          />
        </Flex>
        <Grid columns='4' className="flex-1 bg-[#FFFF] px-2 py-8">
            <LabelledText
              label="MRN"
              value={profileHistory.medicalRecordNumber ?? ''}
            />
            <LabelledText
              label="SSN"
              value={profileHistory?.socialSecurityNumber ?? ''}
            />
            <LabelledText label="CMD" value={profileHistory.chargeKey ?? ''} />
            <LabelledText
              label="Status"
              value={customerStatusIndex[profileHistory.status ?? CODE_NOT_SET]}
            />
            <LabelledText
              label="Driving License"
              value={profileHistory?.driversLicense?.number ?? ''}
            />
            <LabelledText
              label="Driving License State"
              value={profileHistory.driversLicense?.validIn ?? ''}
            />
            <Box>
              <LabelledText
                label="State of Residence"
                required
                value={usStatesIndex[homeAddress?.state ?? CODE_NOT_SET]}
              />
            </Box>
        </Grid>
        <Flex direction="column">
          <Text className="pl-2 pb-1 text-[12px] font-medium">Driving License</Text>
          <Avatar
            size="8"
            color="gray"
            className="mb-2 box-border w-[100%] min-w-[200px] rounded-[12px] p-2"
            src={driverLicenseImage}
            fallback={
              <Box>
                <PictureFallback width={150} height={150} />
              </Box>
            }
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PatientData
