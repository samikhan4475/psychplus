'use client';

import { Flex } from '@radix-ui/themes';
import { useStore } from './store';
import { TemplateContent } from './template-content';
import { ExpandedSidebar } from './templates-tabs-expanded';

const ReportsTemplateTabs = () => {
  const { selectedTemplate } = useStore();

  return (
    <Flex className="w-full  overflow-hidden flex-1">
      <ExpandedSidebar />
      {selectedTemplate && <TemplateContent />}
    </Flex>
  );
};

export { ReportsTemplateTabs };

