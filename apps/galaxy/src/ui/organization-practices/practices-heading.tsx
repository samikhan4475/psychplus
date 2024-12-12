'use client';

import { Flex, Text } from '@radix-ui/themes';

const PracticesHeading = () => {
  return (
    <Flex className="px-2 py-1 gap-1 h-[32px] w-full bg-white" align="center" justify="between">
      <Text className="text-[16px] text-black" weight="medium">Practices</Text>
    </Flex>
  );
};

export { PracticesHeading };