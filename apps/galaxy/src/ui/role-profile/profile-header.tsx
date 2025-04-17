'use client'

import { Flex, Text } from '@radix-ui/themes'
import { SaveButton } from './save-button'

const ProfileHeader = () => {
  return (
    <Flex
      className="h-[32px] w-full gap-1 px-2 py-1"
      align="center"
      justify="between"
    >
      <Text className="text-black text-[16px]" weight="medium">
        Profile
      </Text>
      <SaveButton />
    </Flex>
  )
}

export { ProfileHeader }
