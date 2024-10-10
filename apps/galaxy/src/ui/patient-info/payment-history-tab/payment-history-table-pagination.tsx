'use client'

import { Box } from '@radix-ui/themes'
import { DataTablePagination } from '@/components'
import { PATIENT_PAYMENT_HX_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'

const PaymentHistoryTablePagination = () => {
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
    <Box pr="2" className="z-[1] -mt-2 mb-1">
      <DataTablePagination
        total={data.total}
        loading={loading ?? false}
        page={page}
        pageSize={PATIENT_PAYMENT_HX_TABLE_PAGE_SIZE}
        next={next}
        prev={prev}
        jumpToPage={jumpToPage}
      />
    </Box>
  )
}

export { PaymentHistoryTablePagination }
