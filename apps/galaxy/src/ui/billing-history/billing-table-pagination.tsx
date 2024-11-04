'use client'

import { DataTablePagination } from '@/components'
import { PATIENT_BILLING_HISTORY_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const BillingTablePagination = () => {
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
      total={data.total}
      loading={loading ?? false}
      page={page}
      pageSize={PATIENT_BILLING_HISTORY_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
      className="border-0 border-t"
    />
  )
}

export { BillingTablePagination }
