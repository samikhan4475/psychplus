'use client'

import { useFormContext } from 'react-hook-form'
import { DataTablePagination } from '@/components'
import { useStore } from '@/ui/assigning-authorities/store'
import { SchemaType } from './code-schema'

const CodesTablePagination = () => {
  const form = useFormContext<SchemaType>()
  const {
    selectedCodesetCodes,
    jumpToPage,
    loading,
    page,
    next,
    prev,
    total,
    pageSize,
    onPageSizeChange,
  } = useStore((state) => ({
    jumpToPage: state.jumpToPage,
    selectedCodesetCodes: state.selectedCodesetCodes,
    loading: state.loading,
    page: state.page,
    next: state.next,
    prev: state.prev,
    total: state.total,
    pageSize: state.pageSize,
    onPageSizeChange: state.onPageSizeChange,
  }))

  if (!total || !selectedCodesetCodes) {
    return null
  }

  return (
    <DataTablePagination
      jumpToPage={(page) => {
        form.reset({
          newCodesetCode: undefined,
          editableCodesetCode: undefined,
        })
        jumpToPage(page)
      }}
      total={total}
      loading={loading ?? false}
      page={page}
      pageSize={pageSize}
      onPageSizeChange={(pageSize: number) => {
        form.reset({
          newCodesetCode: undefined,
          editableCodesetCode: undefined,
        })
        onPageSizeChange(pageSize)
      }}
      next={() => {
        form.reset({
          newCodesetCode: undefined,
          editableCodesetCode: undefined,
        })
        next()
      }}
      prev={() => {
        form.reset({
          newCodesetCode: undefined,
          editableCodesetCode: undefined,
        })
        prev()
      }}
      className="bg-white rounded-b-1 border-0 border-t"
      showTotal
    />
  )
}

export { CodesTablePagination }
