'use client'

import { Flex, Text } from '@radix-ui/themes'
import { EditTemplateButton } from './edit-template-button'
import { ReportViewButton } from './report-view-button'
import { ScheduleReportButton } from './schedule-report-button'
import { ScheduleViewButton } from './schedule-view-button'
import { useStore } from './store'
import { DynamicTemplateFilters } from './template-filters-form'
import { VIEW_TYPE } from './types'

const TemplateTitleHeader = () => {
  const { selectedTemplate, templateFilters, viewType } = useStore()

  return (
    <>
      <Flex
        className="bg-white shadow-light-gray-08 h-[32px] px-2"
        align="center"
        justify="between"
      >
        <Flex className="gap-2">
          <Text className="" weight="medium">
            {selectedTemplate?.displayName || 'No template selected'}
          </Text>
          <ReportViewButton />
          <ScheduleViewButton />
        </Flex>
        {viewType === VIEW_TYPE.REPORT && <EditTemplateButton />}
        {viewType === VIEW_TYPE.SCHEDULE && <ScheduleReportButton />}
      </Flex>

      {templateFilters && viewType === VIEW_TYPE.REPORT && (
        <DynamicTemplateFilters />
      )}
    </>
  )
}

export { TemplateTitleHeader }
