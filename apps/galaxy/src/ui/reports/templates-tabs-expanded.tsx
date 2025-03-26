'use client';

import { MedicalReportIcon } from '@/components/icons';
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { AddTemplateButton } from './add-template-button';
import { TabItem } from './reports-tabs-item';
import { useStore } from './store';


const ExpandedSidebar = () => {
  const { setSelectedTemplate, templates, selectedReport, selectedTemplate, setGeneratedReport } = useStore();

  const filteredTemplates = templates.filter(
    (template) => template.reportCategoryCode === selectedReport?.code
  );

  const handleTemplateClick = (template: any) => {
    setSelectedTemplate(template);
    setGeneratedReport(null);
  };

  return (
    <Box className="w-[224px] transition-all duration-300 relative bg-white flex flex-col h-full">
      <ScrollArea className='h-[80vh]'>
        <Flex direction="column" className="p-2 gap-1 h-full">
          <Flex align="center" className="my-2" justify="between">
            <Flex align="center">
              <MedicalReportIcon />
              <Text className="text-pp-black-3 font-medium ml-1">{selectedReport?.displayName}</Text>
            </Flex>
            <AddTemplateButton />
          </Flex>
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

