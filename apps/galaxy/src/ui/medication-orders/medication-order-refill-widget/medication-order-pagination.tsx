'use client'

import { DataTablePagination } from '@/components'
import { useStore } from './store'

const MedicationOrderRefillTablePagination = () => {
  const {
    data,
    loading,
    page,
    changeRequestData,
    next,
    prev,
    jumpToPage,
    activeTab,
  } = useStore((state) => ({
    data: state.data,
    changeRequestData: state.changeRequestData,
    loading: state.loading,
    page: state.page,
    next: state.next,
    prev: state.prev,
    jumpToPage: state.jumpToPage,
    activeTab: state.activeTab,
  }))
  const isRefillTab = activeTab.includes('Refill')

  if (!data && !changeRequestData) {
    return null
  }

  const totalCount = isRefillTab ? data.total : changeRequestData.total
  return (
    <DataTablePagination
      total={totalCount}
      loading={loading ?? false}
      page={page}
      pageSize={20}
      next={next}
      prev={prev}
      jumpToPage={jumpToPage}
    />
  )
}

export { MedicationOrderRefillTablePagination }
