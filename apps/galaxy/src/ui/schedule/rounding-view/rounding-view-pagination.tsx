import { DataTablePagination } from '@/components'
import { useStore } from './store'
import { SCHEDULER_PAGE_SIZE_LIMIT } from '../constants'

const RoundingViewPagination = () => {
  const { loading, page, total, next, prev, jumpToPage } = useStore(
    (state) => ({
      loading: state.loading,
      page: state.page,
      total: state.totalRecords,
      next: state.next,
      prev: state.prev,
      jumpToPage: state.jumpToPage,
    }),
  )

  return (
    <DataTablePagination
      total={total}
      loading={loading ?? false}
      page={page}
      pageSize={SCHEDULER_PAGE_SIZE_LIMIT}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { RoundingViewPagination }
