'use client'

import { DataTablePagination } from '@/components'
import { LABS_ORDER_TABLE_PAGE_SIZE } from './constant'
import { useStore } from './store'
import { usePaginatedTableState } from './hooks/usePaginatedTableState'
const InboxLabOrderTablePagination = () => {
  const store = useStore()
  const { total, loading, page, next, prev, jumpToPage } = usePaginatedTableState(store)

  if (!total) return null

  return (
    <DataTablePagination
      className="border-0"
      total={total}
      loading={loading ?? false}
      page={page}
      pageSize={LABS_ORDER_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { InboxLabOrderTablePagination }
