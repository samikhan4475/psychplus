'use client'

import { DataTablePagination } from '@/components'
import { STAFF_LOCATION_LIST_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const StaffLocationListPagination = () => {
  const { data, loading, page, next, prev, jumpToPage } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    page: state.page,
    next: state.next,
    prev: state.prev,
    jumpToPage: state.jumpToPage,
  }))

  if (!data || loading) {
    return null
  }

  return (
    <DataTablePagination
      className="bg-white"
      total={data.total}
      loading={loading ?? false}
      page={page}
      pageSize={STAFF_LOCATION_LIST_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { StaffLocationListPagination }
