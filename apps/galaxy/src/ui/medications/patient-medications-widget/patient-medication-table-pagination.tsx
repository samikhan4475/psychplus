'use client'

import { DataTablePagination } from '@/components'
import { PATIENT_MEDICATIONS_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const PatientMedicationTablePagination = () => {
  const { data, total, loading, page, next, prev, jumpToPage } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      page: state.page,
      next: state.next,
      prev: state.prev,
      jumpToPage: state.jumpToPage,
      total: state.total,
    }),
  )

  if (!data) {
    return null
  }

  return (
    <DataTablePagination
      jumpToPage={jumpToPage}
      total={total}
      loading={loading ?? false}
      page={page}
      pageSize={PATIENT_MEDICATIONS_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      className="bg-white rounded-b-1 border-0 border-t"
    />
  )
}

export { PatientMedicationTablePagination }
