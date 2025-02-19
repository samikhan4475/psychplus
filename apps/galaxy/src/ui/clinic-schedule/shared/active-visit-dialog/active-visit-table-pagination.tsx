'use client'

import { DataTablePagination } from '@/components'
import { VACATION_LIST_TABLE_PAGE_SIZE } from './constant'
import { useStore } from './store'

const ActiveVisitTablePagination = () => {
  const { visits, loading, page, next, prev, jumpToPage, total } = useStore(
    (state) => ({
      visits: state.visits,
      loading: state.loading,
      page: state.page,
      next: state.next,
      prev: state.prev,
      jumpToPage: state.jumpToPage,
      total: state.total,
    }),
  )

  if (!visits) {
    return null
  }

  return (
    <DataTablePagination
      jumpToPage={jumpToPage}
      total={total}
      loading={loading ?? false}
      page={page}
      pageSize={VACATION_LIST_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      className="border-0"
    />
  )
}

export { ActiveVisitTablePagination }
