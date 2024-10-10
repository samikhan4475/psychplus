'use client'

import { DataTablePaginationLegacy } from '@/components'
import { PATIENT_LOOKUP_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const PatientLookupTablePagination = () => {
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
    <DataTablePaginationLegacy
      total={data.total}
      loading={loading ?? false}
      page={page}
      pageSize={PATIENT_LOOKUP_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
    />
  )
}

export { PatientLookupTablePagination }
