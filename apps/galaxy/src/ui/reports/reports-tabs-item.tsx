'use client';

import { Text } from '@radix-ui/themes';
import { cn } from '@/utils'

type TabItemProps = {
  displayName: string;
  isActive: boolean;
  onClick: () => void;
};

const TabItem = ({ displayName, isActive, onClick }: TabItemProps) => {
  return (
    <Text
      className={cn(
        'tab-item text-pp-black-3 text-[14px] rounded-2 px-3 py-2 hover:bg-pp-blue-300/30 transition duration-300 ease-in-out active:bg-pp-blue-300/40 focus:outline-none focus:ring focus:ring-pp-blue-300/50 cursor-pointer',
        { 'bg-pp-blue-300/20 text-pp-black-1 font-medium': isActive },
      )}
      onClick={onClick}
    >
      {displayName}
    </Text>
  );
};

export { TabItem };
