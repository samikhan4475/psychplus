'use client'

import { DataTablePagination } from '@/components'
import { LOCATION_LIST_TABLE_PAGE_SIZE } from '../constant'
import { useStore } from './store'

const LocationTablePagination = () => {
  const { data, loading, page, next, prev, jumpToPage } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    page: state.page,
    next: state.next,
    prev: state.prev,
    jumpToPage: state.jumpToPage,
  }))

  if (!data) {
    return null
  }

  return (
    <DataTablePagination
      jumpToPage={jumpToPage}
      total={data?.total}
      loading={loading ?? false}
      page={page}
      pageSize={LOCATION_LIST_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      className="bg-white rounded-b-1 border-0 border-t"
    />
  )
}

export { LocationTablePagination }
