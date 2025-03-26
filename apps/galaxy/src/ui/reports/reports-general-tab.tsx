'use client';

import { Text } from '@radix-ui/themes';
import { cn } from '@/utils'

type ReportTabProps = {
  displayName: string;
  isActive: boolean;
  onClick: () => void;
};

const ReportTab = ({ displayName, isActive, onClick }: ReportTabProps) => {
  return (
    <Text
      className={cn(
        'tab-item text-pp-black-3 text-[14px] rounded-b-none py-1 px-2 hover:bg-pp-blue-300/30 transition duration-300 ease-in-out active:bg-pp-blue-300/40 focus:outline-none focus:ring focus:ring-pp-blue-300/50 cursor-pointer border border-solid border-pp-table-border bg-pp-focus-bg',
        { 'bg-white text-pp-black-3 font-medium': isActive },
      )}
      onClick={onClick}
    >
      {displayName}
    </Text>
  );
};

export { ReportTab };
