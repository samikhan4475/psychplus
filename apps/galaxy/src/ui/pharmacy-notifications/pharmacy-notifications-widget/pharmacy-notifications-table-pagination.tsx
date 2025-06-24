import { DataTablePagination } from '@/components'
import { NOTIFICATIONS_PAGE_SIZE_LIMIT } from './constants'
import { useStore } from './store'

const PharmacyNotificationViewPagination = () => {
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
      pageSize={NOTIFICATIONS_PAGE_SIZE_LIMIT}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
      className="border-0 border-t"
    />
  )
}

export { PharmacyNotificationViewPagination }
