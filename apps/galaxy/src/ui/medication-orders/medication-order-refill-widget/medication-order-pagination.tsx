'use client'

import { DataTablePagination } from '@/components'
import { useStore } from './store'

const MedicationOrderRefillTablePagination = () => {
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
      pageSize={20}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { MedicationOrderRefillTablePagination }
