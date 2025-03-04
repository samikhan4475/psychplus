'use client'

import { DataTablePagination } from '@/components'
import { sanitizeFormData } from '@/utils'
import { NOTES_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'
import { Tabs } from './types'
import { removeEmptyValues } from './utils'

const NotesTablePagination = () => {
  const { data, jumpToPage, loading, page, next, prev, tab, formData } =
    useStore((state) => ({
      jumpToPage: state.jumpToPage,
      data: state.data,
      loading: state.loading,
      page: state.page,
      next: state.next,
      prev: state.prev,
      tab: state.tab,
      formData: state.formData,
    }))

  const status = tab === Tabs.PENDING_NOTES ? ['pending'] : ['SignedPending']

  const sanitizePayload = removeEmptyValues(
    sanitizeFormData({ ...formData, status: status }),
  )
  if (!data) {
    return null
  }

  return (
    <DataTablePagination
      jumpToPage={(page) => {
        jumpToPage(sanitizePayload, page)
      }}
      total={data.total ?? 0}
      loading={loading ?? false}
      page={page}
      pageSize={NOTES_TABLE_PAGE_SIZE}
      next={() => {
        next(sanitizePayload)
      }}
      prev={() => {
        prev(sanitizePayload)
      }}
      className="bg-white border-0 border-t"
    />
  )
}

export { NotesTablePagination }
