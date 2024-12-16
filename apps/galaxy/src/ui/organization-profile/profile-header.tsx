'use client';

import { Flex, Text } from '@radix-ui/themes';
import { SaveButton } from './save-button';

const ProfileHeader = () => {
  return (
    <Flex className="px-2 py-1 gap-1 h-[32px] w-full" align="center" justify="between">
      <Text className="text-[16px] text-black" weight="medium">Profile</Text>
      <SaveButton />
    </Flex>
  );
};

export { ProfileHeader };
