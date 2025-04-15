'use client'

import { DataTablePagination } from '@/components'
import { useStore } from './store'

const AutoTextTablePagination = () => {
  const {
    data,
    total,
    loading,
    page,
    next,
    prev,
    jumpToPage,
    onPageSizeChange,
    pageSize,
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

  if (!total || !data) {
    return null
  }

  return (
    <DataTablePagination
      jumpToPage={jumpToPage}
      total={total}
      loading={loading ?? false}
      page={page}
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      next={next}
      prev={prev}
      className="bg-white rounded-b-1 border-0 border-t"
      showTotal
    />
  )
}

export { AutoTextTablePagination }
