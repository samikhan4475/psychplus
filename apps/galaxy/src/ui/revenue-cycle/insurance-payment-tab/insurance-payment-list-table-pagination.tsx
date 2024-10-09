'use client'

import { DataTablePagination } from '@/components'
import { INSURANCE_PAYMENT_LIST_TABLE_PAGE_SIZE } from '../constants'
import { useStore } from './store'

const InsurancePaymentListTablePagination = () => {
  const { data, loading, page, next, prev } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    page: state.page,
    next: state.next,
    prev: state.prev,
  }))

  if (!data) {
    return null
  }

  return (
    <DataTablePagination
      total={data.total}
      loading={loading ?? false}
      page={page}
      pageSize={INSURANCE_PAYMENT_LIST_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
    />
  )
}

export { InsurancePaymentListTablePagination }
