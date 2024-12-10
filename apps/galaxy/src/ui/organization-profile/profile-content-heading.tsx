'use client';

import { Flex, Text } from '@radix-ui/themes';

interface ProfileContentHeadingProps {
  title: string
}

const ProfileContentHeading = ({ title }: ProfileContentHeadingProps) => {
  return (
    <Flex className="px-2 py-1 gap-1 h-[24px] w-full bg-pp-bg-table-label my-1" align="center" justify="between">
      <Text className="text-[16px] font-[600] text-black">{title}</Text>
    </Flex>
  );
};

export { ProfileContentHeading };
