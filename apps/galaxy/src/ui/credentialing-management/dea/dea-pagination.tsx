import { DataTablePagination } from '@/components'
import { PAGE_SIZE_LIMIT } from '../constants'
import { useStore } from './store'

const DEAPagination = () => {
  const { loading, page, total, next, prev, jumpToPage } = useStore(
    (state) => ({
      loading: state.loading,
      page: state.page,
      next: state.next,
      total: state.total,
      jumpToPage: state.jumpToPage,
      prev: state.prev,
    }),
  )
  return (
    <DataTablePagination
      loading={loading ?? false}
      total={total}
      page={page}
      pageSize={PAGE_SIZE_LIMIT}
      next={next}
      jumpToPage={jumpToPage}
      prev={prev}
    />
  )
}

export { DEAPagination }
