'use client'

import { DataTablePagination } from '@/components'
import { useStore } from './store'

const StaffListTablePagination = () => {
  const {
    data,
    loading,
    page,
    next,
    prev,
    jumpToPage,
    total,
    pageSize,
    onPageSizeChange,
  } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    page: state.page,
    next: state.next,
    prev: state.prev,
    jumpToPage: state.jumpToPage,
    total: state.total,
    pageSize: state.pageSize,
    onPageSizeChange: state.onPageSizeChange,
  }))

  if (!data || loading || !total) {
    return null
  }

  return (
    <DataTablePagination
      className="bg-white"
      total={total}
      loading={loading ?? false}
      page={page}
      pageSize={pageSize}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
      onPageSizeChange={onPageSizeChange}
      showTotal
    />
  )
}

export { StaffListTablePagination }
