'use client';

import { Box } from '@radix-ui/themes';
import { GeneratedReport } from './generated-report';
import { TemplateTitleHeader } from './template-title-header';

const TemplateContent = () => {
  return (
    <Box className="flex-1 bg-gray-50 m-1 bg-white">
      <TemplateTitleHeader />
      <GeneratedReport />
    </Box>
  );
};

export { TemplateContent };

