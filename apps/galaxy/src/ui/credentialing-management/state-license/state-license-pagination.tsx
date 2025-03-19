import { DataTablePagination } from '@/components'
import { PAGE_SIZE_LIMIT } from '../constants'
import { useStore } from './store'

const StateLicensePagination = () => {
  const { loading, page, total, next, prev, jumpToPage } = useStore(
    (state) => ({
      loading: state.loading,
      page: state.page,
      total: state.total,
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
      pageSize={PAGE_SIZE_LIMIT}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { StateLicensePagination }
