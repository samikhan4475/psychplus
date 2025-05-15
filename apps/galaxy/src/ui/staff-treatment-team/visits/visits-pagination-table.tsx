'use client'

import { DataTablePagination } from '@/components'
import { useStore } from './store'

const VisitsTablePagination = () => {
  const {
    visitsData,
    loadingVisits,
    page,
    next,
    prev,
    jumpToPage,
    onPageSizeChange,
    pageSize,
  } = useStore((state) => ({
    visitsData: state.visitsData,
    loadingVisits: state.loadingVisits,
    page: state.page,
    next: state.next,
    prev: state.prev,
    jumpToPage: state.jumpToPage,
    onPageSizeChange: state.onPageSizeChange,
    pageSize: state.pageSize,
  }))

  if (!visitsData) {
    return null
  }

  return (
    <DataTablePagination
      className="border-0 border-t"
      jumpToPage={jumpToPage}
      loading={loadingVisits ?? false}
      next={next}
      onPageSizeChange={onPageSizeChange}
      page={page}
      pageSize={pageSize}
      prev={prev}
      showTotal
      total={visitsData.total}
    />
  )
}

export { VisitsTablePagination }
