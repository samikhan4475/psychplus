'use client'

import { DataTablePagination } from '@/components'
import { CLAIM_LIST_TABLE_PAGE_SIZE } from '../constants'
import { useStore } from './store'

const ClaimsListTablePagination = () => {
  const { claimsListData, claimsListLoading, page, next, prev } = useStore(
    (state) => ({
      claimsListData: state.claimsListData,
      claimsListLoading: state.claimsListLoading,
      page: state.page,
      next: state.next,
      prev: state.prev,
    }),
  )

  if (!claimsListData) {
    return null
  }

  return (
    <DataTablePagination
      total={claimsListData.total}
      loading={claimsListLoading ?? false}
      page={page}
      pageSize={CLAIM_LIST_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
    />
  )
}

export { ClaimsListTablePagination }
