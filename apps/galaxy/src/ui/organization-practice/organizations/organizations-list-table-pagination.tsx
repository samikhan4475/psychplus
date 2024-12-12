'use client'

import { DataTablePagination } from '@/components'
import { ORGANIZATIONS_LIST_TABLE_PAGE_SIZE } from '../constants'
import { useStore } from './store'

const OrganizationsListTablePagination = () => {
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
      pageSize={ORGANIZATIONS_LIST_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { OrganizationsListTablePagination }
