'use client'

import { Box } from '@radix-ui/themes'
import { GeneratedReport } from './generated-report'
import { SchedulesListTable } from './schedules-list-table'
import { useStore } from './store'
import { TemplateTitleHeader } from './template-title-header'
import { VIEW_TYPE } from './types'

const TemplateContent = () => {
  const { viewType } = useStore()
  return (
    <Box className="bg-gray-50 mx-1 mb-0 flex-1">
      <TemplateTitleHeader />
      {viewType === VIEW_TYPE.REPORT && <GeneratedReport />}
      {viewType === VIEW_TYPE.SCHEDULE && <SchedulesListTable />}
    </Box>
  )
}

export { TemplateContent }
