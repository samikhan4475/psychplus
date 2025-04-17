'use client'

import { Flex, Text } from '@radix-ui/themes'
import { PageFeatureSelect } from './page-feature-select'
import { SaveButton } from './save-button'

const ProfileHeader = () => {
  return (
    <Flex
      className="h-[32px] w-full gap-1 px-2 py-1"
      align="center"
      justify="between"
    >
      <Flex gap="6">
        <Text className="text-black text-[16px]" weight="medium">
          Permissions
        </Text>
        <PageFeatureSelect />
      </Flex>
      <SaveButton />
    </Flex>
  )
}

export { ProfileHeader }
