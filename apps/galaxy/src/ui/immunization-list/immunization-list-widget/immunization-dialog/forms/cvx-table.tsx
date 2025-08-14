'use client'

import { ScrollArea } from '@radix-ui/themes'
import { getCoreRowModel, Row, useReactTable } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { cn } from '@/utils'
import { useStore } from '../../store/store'
import { CvxCodes } from '../../types'
import { columns } from './column'

interface CvxTableProps {
  setFormValue: (data: CvxCodes) => void
}

const CvxTable = ({ setFormValue }: CvxTableProps) => {
  const { loadingCvxCodes, cvxCodesData = [] } = useStore((state) => ({
    loadingCvxCodes: state.loadingCvxCodes,
    cvxCodesData: state.cvxCodesData,
  }))

  useReactTable({
    data: cvxCodesData,
    columns: columns(),
    getCoreRowModel: getCoreRowModel(),
  })

  const handleRowSelection = (row: Row<CvxCodes>) => setFormValue(row.original)

  return (
    <ScrollArea
      className={cn('bg-white mx-auto h-auto rounded-[25px] shadow-3', {
        'min-h-28': loadingCvxCodes,
      })}
      style={{ maxHeight: '150px', width: '100%' }}
    >
      {loadingCvxCodes ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DataTable
          columns={columns()}
          data={cvxCodesData ?? []}
          disablePagination
          sticky
          onRowClick={(row) => handleRowSelection(row)}
        />
      )}
    </ScrollArea>
  )
}

export { CvxTable }
