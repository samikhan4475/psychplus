import { useMemo } from 'react'

interface PaginationStore {
  data?: { total: number }
  loading?: boolean
  page: number
  next: () => void
  prev: () => void
  jumpToPage: (page: number) => void
}

export const usePaginatedTableState = (store: PaginationStore) => {
  return useMemo(() => {
    return {
      total: store.data?.total ?? 0,
      loading: store.loading ?? false,
      page: store.page,
      next: store.next,
      prev: store.prev,
      jumpToPage: store.jumpToPage,
    }
  }, [store])
}
