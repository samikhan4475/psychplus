import { DataTablePagination } from '@/components'
import { useStore } from './store'

const CLINIC_TIME_TABLE_PAGE_SIZE = 20

const ClinicTimeTablePagination = () => {
  const { data, loading, page, next, prev, jumpToPage, total } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      total: state.total,
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
      total={total}
      loading={loading ?? false}
      page={page}
      pageSize={CLINIC_TIME_TABLE_PAGE_SIZE}
      next={next}
      prev={prev}
      className="bg-white"
    />
  )
}

export { ClinicTimeTablePagination }
