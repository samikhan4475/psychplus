'use client'

import { DataTablePagination } from '@/components'
import { LIST_TABLE_PAGE_SIZE } from '@/ui/pharmacy-management/constants'
import { useStore } from '../store'
const PharmacyTablePagination = () => {

  const { pharmacies, total, loading, page, next, prev, jumpToPage } = useStore(
    (state) => state,
  )

  if (!pharmacies) {
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

export { PharmacyTablePagination }
