'use client';

import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { useStore } from './store';
import { TemplateContent } from './template-content';
import { CollapsedSidebar } from './template-tabs-collapsed';
import { ExpandedSidebar } from './templates-tabs-expanded';

const ReportsTemplateTabs = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const { selectedTemplate } = useStore();

  const toggleSidebar = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Flex className="w-full">
      {isCollapsed ? (
        <CollapsedSidebar toggleSidebar={toggleSidebar} />
      ) : (
        <ExpandedSidebar toggleSidebar={toggleSidebar} />
      )}
      {selectedTemplate && <TemplateContent />}
    </Flex>
  );
};

export { ReportsTemplateTabs };

