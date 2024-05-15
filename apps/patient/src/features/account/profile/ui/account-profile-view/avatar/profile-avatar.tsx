'use client'

import { getUserFullName, getUserInitials } from '@psychplus-v2/utils'
import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import { useProfileStore } from '../../../store'
import { LocalImageUpload } from './local-image-upload'
import { WebcamImageUpload } from './webcam-image-upload'

const ProfileAvatar = () => {
  const profile = useProfileStore((state) => state.profile)

  return (
    <Flex align="center" justify="center">
      <Flex direction="column" align="center" position="relative">
        <Box position="relative">
          <Avatar
            src={
              profile.hasPhoto ? '/api/patients/self/profileimage' : undefined
            }
            size="9"
            alt=""
            fallback={getUserInitials(profile.legalName)}
            highContrast
            className="border border-accent-12"
          />
          <Box position="absolute" className="bottom-[25px] right-0">
            <LocalImageUpload />
          </Box>
          <Box position="absolute" className="bottom-0 right-[25px]">
            <WebcamImageUpload />
          </Box>
        </Box>
        <Text className="text-[28px] font-[600]">
          {getUserFullName(profile.legalName, true)}
        </Text>
        <Text className="text-[14px] text-gray-11">{`Member since ${new Date(
          profile.metadata.createdOn,
        ).getUTCFullYear()}`}</Text>
      </Flex>
    </Flex>
  )
}

export { ProfileAvatar }
