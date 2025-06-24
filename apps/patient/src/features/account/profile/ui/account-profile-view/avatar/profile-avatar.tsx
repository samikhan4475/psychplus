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
              profile.hasPhoto ? `/api/patients/self/profileimage?t=${Date.now()}` : undefined
            }
            // size={{ initial: '5', sm: '9' }}
            alt=""
            fallback={getUserInitials(profile.legalName)}
            highContrast
            className="border border-accent-12 w-[90px] h-[90px] sm:w-[158px] sm:h-[158px]"
          />
          <Box position="absolute" className="bottom-[25px] right-[-10px] sm:right-0">
            <LocalImageUpload />
          </Box>
          <Box position="absolute" className="bottom-[-10px] sm:bottom-0 right-[25px]">
            <WebcamImageUpload />
          </Box>
        </Box>
        <Text className="text-[20px] sm:text-[28px] font-[600] mt-2 sm:mt-0">
          {getUserFullName(profile.legalName, true)}
        </Text>
        <Text className="text-[12px] sm:text-[14px] text-gray-11">{`Member since ${new Date(
          profile.metadata.createdOn,
        ).getUTCFullYear()}`}</Text>
      </Flex>
    </Flex>
  )
}

export { ProfileAvatar }
