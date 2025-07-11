'use client'

import { DataTablePagination } from '@/components-v2'
import { useStore } from '../store'

const WaitlistTablePagination = () => {
  const { data, page, total, pageSize, onPageSizeChange } = useStore(
    (state) => ({
      data: state.data,
      page: state.page,
      total: state.total,
      pageSize: state.pageSize,
      onPageSizeChange: state.onPageSizeChange,
    }),
  )

  if (!total || !data) return null

  return (
    <DataTablePagination
      total={total}
      page={page}
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
    />
  )
}

export { WaitlistTablePagination }
