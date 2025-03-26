'use client'

import { DataTablePagination } from '@/components'
import { useStore } from './store'
import { REPORT_LIST_TABLE_PAGE_SIZE } from './constans'

const GeneratedReportTablePagination = () => {
  const { generatedReport, loading, page, next, prev, jumpToPage, totalRecords } = useStore((state) => ({
    generatedReport: state.generatedReport,
    loading: state.loading,
    page: state.page,
    next: state.next,
    prev: state.prev,
    jumpToPage: state.jumpToPage,
    totalRecords:state.totalRecords
  }))

  if (!generatedReport) {
    return null
  }

  return (
    <DataTablePagination
      total={totalRecords}
      loading={loading ?? false}
      page={page}
      pageSize={REPORT_LIST_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { GeneratedReportTablePagination }
