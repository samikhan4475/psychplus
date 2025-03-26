'use client'

import { Flex, Text } from '@radix-ui/themes'
import { EditTemplateButton } from './edit-template-button'
import { ReportViewButton } from './report-view-button'
import { ScheduleViewButton } from './schedule-view-button'
import { useStore } from './store'
import { DynamicTemplateFilters } from './template-filters-form'

const TemplateTitleHeader = () => {
  const { selectedTemplate, templateFilters } = useStore()

  return (
    <>
      <Flex
        className="bg-white shadow-light-gray-08 h-[32px]"
        align="center"
        justify="between"
      >
        <Flex className="gap-2">
          <Text className="px-2" weight="medium">
            {selectedTemplate?.displayName || 'No template selected'}
          </Text>
          <ReportViewButton isActive />{' '}
          {/* Temporarily set to active for testing purposes. Will be dynamically controlled in future updates. */}
          <ScheduleViewButton />
        </Flex>
        <EditTemplateButton />
      </Flex>

      {templateFilters && <DynamicTemplateFilters />}
    </>
  )
}

export { TemplateTitleHeader }
