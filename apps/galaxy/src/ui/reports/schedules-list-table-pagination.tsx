'use client'

import { Box } from '@radix-ui/themes'
import { DataTablePagination } from '@/components'
import { REPORT_SCHEDULE_LIST_TABLE_PAGE_SIZE } from './constans'
import { useStore } from './store'

const SchedulesListTablePagination = () => {
  const {
    scheduleReports,
    scheduleReportLoading,
    scheduleReportPage,
    nextScheduledReport,
    prevScheduledReport,
    jumpToPageScheduleReport,
  } = useStore((state) => ({
    scheduleReports: state.scheduleReports,
    scheduleReportLoading: state.scheduleReportLoading,
    scheduleReportPage: state.scheduleReportPage,
    nextScheduledReport: state.nextScheduledReport,
    prevScheduledReport: state.prevScheduledReport,
    jumpToPageScheduleReport: state.jumpToPageScheduleReport,
  }))

  if (!scheduleReports) {
    return null
  }

  return (
    <Box className="bg-white border-none">
      <DataTablePagination
        total={scheduleReports.total}
        loading={scheduleReportLoading ?? false}
        page={scheduleReportPage}
        pageSize={REPORT_SCHEDULE_LIST_TABLE_PAGE_SIZE}
        next={nextScheduledReport}
        prev={prevScheduledReport}
        jumpToPage={jumpToPageScheduleReport}
      />
    </Box>
  )
}

export { SchedulesListTablePagination }
