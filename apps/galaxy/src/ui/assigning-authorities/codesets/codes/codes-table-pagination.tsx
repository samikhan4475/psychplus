'use client'

import { useFormContext } from 'react-hook-form'
import { DataTablePagination } from '@/components'
import { useStore } from '@/ui/assigning-authorities/store'
import { CODESET_CODES_TABLE_PAGE_SIZE } from '../constants'
import { SchemaType } from './code-schema'

const CodesTablePagination = () => {
  const form = useFormContext<SchemaType>()
  const { selectedCodesetCodes, jumpToPage, loading, page, next, prev } =
    useStore((state) => ({
      jumpToPage: state.jumpToPage,
      selectedCodesetCodes: state.selectedCodesetCodes,
      loading: state.loading,
      page: state.page,
      next: state.next,
      prev: state.prev,
    }))

  if (!selectedCodesetCodes) {
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
      total={selectedCodesetCodes.total ?? 0}
      loading={loading ?? false}
      page={page}
      pageSize={CODESET_CODES_TABLE_PAGE_SIZE}
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
      className="bg-white border-0 border-t"
    />
  )
}

export { CodesTablePagination }
