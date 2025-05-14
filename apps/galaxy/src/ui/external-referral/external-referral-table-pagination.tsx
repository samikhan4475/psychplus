'use client'

import { useShallow } from 'zustand/react/shallow'
import { DataTablePagination } from '@/components'
import { EXTERNAL_REFERRAL_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const ExternalReferralTablePagination = () => {
  const { data, loading, page, next, prev, jumpToPage } = useStore(
    useShallow((state) => ({
      data: state.data,
      loading: state.loading,
      page: state.page,
      next: state.next,
      prev: state.prev,
      jumpToPage: state.jumpToPage,
    })),
  )

  if (!data) {
    return null
  }

  return (
    <DataTablePagination
      jumpToPage={jumpToPage}
      total={data.total}
      loading={loading ?? false}
      page={page}
      pageSize={EXTERNAL_REFERRAL_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      className="bg-white"
    />
  )
}

export { ExternalReferralTablePagination }
