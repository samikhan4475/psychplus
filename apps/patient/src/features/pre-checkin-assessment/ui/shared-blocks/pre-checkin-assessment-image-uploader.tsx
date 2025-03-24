'use client'

import React from 'react'
import { getUserInitials } from '@psychplus-v2/utils'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { usePatientForm } from '../steps/patient-info/hooks/use-patient-form'
import { PreCheckinImageUpload } from './pre-checkin-image-upload'
import PreCheckinViewImage from './pre-checkin-view-image'
import { PreCheckinWebcamImageUpload } from './pre-checkin-webcam-image-upload'

const PreCheckinAssessmentImageUploader = () => {
  const { profile } = usePatientForm()

  return (
    <Flex className="items-center" direction="column" gap="2">
      <Box className="rounded-full relative h-24 w-24 overflow-hidden">
        <Avatar
          src={profile.hasPhoto ? `/api/patients/self/profileimage?t=${Date.now()}` : undefined}
          size="7"
          alt=""
          fallback={profile.legalName ? getUserInitials(profile.legalName) : ''}
          highContrast
          className="border-2 border-[#BFD8E9]"
        />
      </Box>
      <Flex
        direction="row"
        className="mx-auto w-[84px] items-center justify-center"
        gap="3"
      >
        <Flex align="center" justify="center">
          <PreCheckinViewImage />
        </Flex>
        <Flex align="center" justify="center">
          <PreCheckinImageUpload />
        </Flex>
        <Flex align="center" justify="center">
          <PreCheckinWebcamImageUpload />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PreCheckinAssessmentImageUploader
