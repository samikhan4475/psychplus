import { DataTablePagination } from '@/components'
import { SCHEDULER_PAGE_SIZE_LIMIT } from '../constants'
import { useStore } from './store'

const ListViewPagination = () => {
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
      showTotal
      loading={loading ?? false}
      page={page}
      pageSize={SCHEDULER_PAGE_SIZE_LIMIT}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { ListViewPagination }
