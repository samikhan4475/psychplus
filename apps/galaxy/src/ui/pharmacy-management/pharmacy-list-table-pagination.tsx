'use client'

import { DataTablePagination } from '@/components'
import { LIST_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const PharmacyListTablePagination = () => {
  const { data, total, loading, page, next, prev, jumpToPage } = useStore(
    (state) => state,
  )

  if (!data) {
    return null
  }

  return (
    <DataTablePagination
      total={total ?? 0}
      loading={loading ?? false}
      page={page}
      pageSize={LIST_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { PharmacyListTablePagination }
