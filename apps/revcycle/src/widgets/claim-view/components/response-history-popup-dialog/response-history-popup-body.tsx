import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { getResponseHistoryDetail } from '../../api.client'
import { ResponseHistoryDetail } from '../../types'
import { TableCellLongText } from '../submission-table/table-cell-long-text'

const columns: ColumnDef<ResponseHistoryDetail>[] = [
  {
    id: 'responseId',
    accessorKey: 'responseId',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Response Id"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.responseId} />
    ),
    enableHiding: true,
  },
  {
    id: 'filePath',
    accessorKey: 'filePath',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="File Path"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={100}
        text={`${row.original.filePath}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'fileType',
    accessorKey: 'fileType',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="File Type"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={100}
        text={`${row.original.fileType}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'isProcessed',
    accessorKey: 'isProcessed',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Processing Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={100}
        text={`${row.original.isProcessed}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'transcationReferenceNumber',
    accessorKey: 'transcationReferenceNumber',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Transaction Reference"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.transcationReferenceNumber} />
    ),
    enableHiding: true,
  },
]

interface PopupProps {
  batchId: string
}

const ClaimSubmissionHistoryPopupBody = ({ batchId }: PopupProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<ResponseHistoryDetail[]>([])

  useEffect(() => {
    ; (async () => {
      try {
        const response = await getResponseHistoryDetail(batchId)
        setData(response)
        setIsLoading(false)
      } catch (error) { 
        setIsLoading(false)
      }
    })()
  }, [batchId])

  return (
    <Flex direction="column" gap="4" mb="4">
      {isLoading ? (
        'Please wait...'
      ) : (
        <DataTable
          data={data}
          columns={columns}
          tableClass="border border-solid border-[lightgray] "
          tHeadClass="bg-[#EBF3FC]"
          thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
          isRowPan={true}
          toBodyClass="border-[lightgray]; border-b border-solid"
          columnCellClass="border border-solid border-[#F2F2F2] w-50"
        />
      )}
    </Flex>
  )
}

export { ClaimSubmissionHistoryPopupBody }
