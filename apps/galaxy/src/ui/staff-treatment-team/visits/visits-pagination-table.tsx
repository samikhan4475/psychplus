'use client'

import { DataTablePagination } from '@/components'
import { VISITS_TABLE_PAGE_SIZE } from './constant'
import { useStore } from './store'

const VisitsTablePagination = () => {
  const { visitsData, loadingVisits, page, next, prev, jumpToPage } = useStore(
    (state) => ({
      visitsData: state.visitsData,
      loadingVisits: state.loadingVisits,
      page: state.page,
      next: state.next,
      prev: state.prev,
      jumpToPage: state.jumpToPage,
    }),
  )

  if (!visitsData) {
    return null
  }

  return (
    <DataTablePagination
      total={visitsData.total}
      loading={loadingVisits ?? false}
      page={page}
      pageSize={VISITS_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
      className="border-0 border-t"
    />
  )
}

export { VisitsTablePagination }
