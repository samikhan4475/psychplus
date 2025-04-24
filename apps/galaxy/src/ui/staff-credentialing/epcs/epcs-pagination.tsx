import { DataTablePagination } from '@/components'
import { useStore } from './store'
import { PAGE_SIZE_LIMIT } from '../constants'
const EPCSPagination = () => {
  const { loading, page, total, next, prev, jumpToPage } = useStore(
    (state) => ({
      loading: state.loading,
      total: state.data.total,
      page: state.page,
      next: state.next,
      jumpToPage: state.jumpToPage,
      prev: state.prev,
    }),
  )
  return (
    <DataTablePagination
      total={total}
      loading={loading ?? false}
      pageSize={PAGE_SIZE_LIMIT}
      page={page}
      prev={prev}
      next={next}
      jumpToPage={jumpToPage}
    />
  )
}

export { EPCSPagination }
