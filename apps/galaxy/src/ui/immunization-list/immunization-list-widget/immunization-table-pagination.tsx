'use client'

import { DataTablePagination } from '@/components'
import { IMMUNIZATION_TABLE_PAGE_SIZE } from './constant'
import { useStore } from './store'

const ImmunizationTablePagination = () => {
  const { total, loading, page, next, prev, jumpToPage } = useStore(
    ({ total, loading, page, next, prev, jumpToPage }) => ({
      total,
      loading,
      page,
      next,
      prev,
      jumpToPage,
    }),
  )

  return (
    <DataTablePagination
      total={total ?? 0}
      loading={loading ?? false}
      page={page}
      pageSize={IMMUNIZATION_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
      showTotal
    />
  )
}

export { ImmunizationTablePagination }
