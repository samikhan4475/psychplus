'use client'

import React, { useState } from 'react'
import { getUserInitials } from '@psychplus-v2/utils'
import { Avatar, Box, Flex } from '@radix-ui/themes'
import { usePatientForm } from '../steps/patient-info/hooks/use-patient-form'
import { PreCheckinImageUpload } from './pre-checkin-image-upload'
import PreCheckinViewImage from './pre-checkin-view-image'
import { PreCheckinWebcamImageUpload } from './pre-checkin-webcam-image-upload'

const PreCheckinAssessmentImageUploader = () => {
  const { profile } = usePatientForm()
  const [avatarKey, setAvatarKey] = useState(0);

  return (
    <Flex className="items-center" direction="column" gap="2">
      <Box className="rounded-full relative h-24 w-24 overflow-hidden">
        <Avatar
          key={avatarKey}
          src={`/api/patients/self/profileimage?t=${Date.now()}`}
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
          <PreCheckinImageUpload setAvatarKey={setAvatarKey} />
        </Flex>
        <Flex align="center" justify="center">
          <PreCheckinWebcamImageUpload setAvatarKey={setAvatarKey} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PreCheckinAssessmentImageUploader
