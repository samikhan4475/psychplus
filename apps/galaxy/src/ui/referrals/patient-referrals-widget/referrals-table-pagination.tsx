'use client'

import { useStore as zustandUseStore } from 'zustand'
import { DataTablePagination } from '@/components'
import { PATIENT_REFERRALS_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const ReferralsTablePagination = () => {
  const store = useStore()
  const { data, loading, page, next, prev, jumpToPage } = zustandUseStore(
    store,
    (state) => ({
      data: state.data,
      loading: state.loading,
      page: state.page,
      next: state.next,
      prev: state.prev,
      jumpToPage: state.jumpToPage,
    }),
  )

  if (!data) {
    return null
  }
  return (
    <DataTablePagination
      jumpToPage={jumpToPage}
      total={data?.total ?? 0}
      loading={loading ?? false}
      page={page}
      pageSize={PATIENT_REFERRALS_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      className="bg-white border-0 border-t"
    />
  )
}

export { ReferralsTablePagination }
