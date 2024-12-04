'use client';

import { MedicalReportIcon } from '@/components/icons';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { AddTemplateButton } from './add-template-button';
import { TabItem } from './reports-tabs-item';
import { useStore } from './store';

type ExpandedSidebarProps = {
  toggleSidebar: () => void;
};

const ExpandedSidebar = ({ toggleSidebar }: ExpandedSidebarProps) => {
  const { setSelectedTemplate, templates, selectedReport, selectedTemplate, setGeneratedReport } = useStore();

  const filteredTemplates = templates.filter(
    (template) => template.reportCategoryCode === selectedReport?.code
  );

  const handleTemplateClick = (template: any) => {
    setSelectedTemplate(template);
    setGeneratedReport(null);
  };

  return (
    <Box className="w-[224px] transition-all duration-300 relative bg-white">
      <ScrollArea className='md:h-[80vh] xl:h-full'>
        <Flex
          justify="center"
          align="center"
          onClick={toggleSidebar}
          className="absolute right-[-4px] top-[16px] z-50 h-[20px] w-[20px] cursor-pointer justify-center rounded-full border border-pp-black-3/30 bg-white shadow-light-08"
        >
          <ChevronLeftIcon />
        </Flex>

        <Flex direction="column" className="p-2 gap-1">
          <Flex align="center" className="my-2">
            <MedicalReportIcon />
            <Text className="text-pp-black-3 font-medium ml-1">{selectedReport?.displayName}</Text>
          </Flex>
          <AddTemplateButton isCollapsed={false} />
          {filteredTemplates.map((item) => (
            <TabItem
              key={item.id}
              displayName={item.displayName}
              isActive={selectedTemplate?.id === item.id}
              onClick={() => handleTemplateClick(item)}
            />
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  );
};

export { ExpandedSidebar };

