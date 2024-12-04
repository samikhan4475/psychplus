'use client';

import { Flex, Text } from '@radix-ui/themes';
import { EditTemplateButton } from './edit-template-button';
import { useStore } from './store';
import { DynamicTemplateFilters } from './template-filters-form';

const TemplateTitleHeader = () => {
  const { selectedTemplate, templateFilters } = useStore();

  return (
    <>
      <Flex className="bg-white h-[32px] shadow-light-gray-08" align="center" justify="between">
        <Text className="px-2" weight="medium">
          {selectedTemplate?.displayName || 'No template selected'}
        </Text>
        <EditTemplateButton />
      </Flex>

      {templateFilters && <DynamicTemplateFilters />}
    </>
  );
};

export { TemplateTitleHeader };

