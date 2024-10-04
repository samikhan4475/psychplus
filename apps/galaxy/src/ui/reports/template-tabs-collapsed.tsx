'use client';

import { DocumentIcon } from '@/components/icons';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Box, Flex } from '@radix-ui/themes';
import { AddTemplateButton } from './add-template-button';

type SidebarProps = {
  toggleSidebar: () => void;
};

const CollapsedSidebar = ({ toggleSidebar }: SidebarProps) => {
  return (
    <Box className="w-[46px] transition-all duration-300 m-1 bg-white relative overflow-visible">
      <Flex direction="column" className="p-2 gap-1 relative">
        <Flex align="center" className='my-2'>
          <DocumentIcon />
        </Flex>

        <Flex
          justify="center"
          align="center"
          onClick={toggleSidebar}
          className="absolute right-[-7px] top-[16px] z-50 h-[20px] w-[20px] cursor-pointer justify-center rounded-full border border-pp-blue-200 bg-white shadow-light-08"
        >
          <ChevronRightIcon />
        </Flex>

        <AddTemplateButton isCollapsed={true} />
      </Flex>
    </Box>
  );
};

export { CollapsedSidebar };

