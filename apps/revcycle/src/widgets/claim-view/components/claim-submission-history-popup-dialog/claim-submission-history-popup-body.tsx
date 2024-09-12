import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { getClaimSubmissionHistoryDetail } from '../../api.client'
import { ClaimSubmissionHistoryDetail } from '../../types'
import { formattedDate } from '../../utils'
import { TableCellLongText } from '../submission-table/table-cell-long-text'

const columns: ColumnDef<ClaimSubmissionHistoryDetail>[] = [
  {
    id: 'claimNumber',
    accessorKey: 'claimNumber',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Claim Number"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.claimNumber} />
    ),
    enableHiding: true,
  },
  {
    id: 'patientName',
    accessorKey: 'patientName',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Patient Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.patientName} />
    ),
    enableHiding: true,
  },
  {
    id: 'dateOfServiceFrom',
    accessorKey: 'dateOfServiceFrom',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOS"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={100}
        text={`${formattedDate(row.original.dateOfServiceFrom)}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'metadata.createdOn',
    accessorKey: 'metadata.createdOn',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Submitted Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={100}
        text={`${formattedDate(row.original.metadata.createdOn)}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Due Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={100}
        text={`$${row.original.amount !== undefined ? row.original.amount : 0}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'status',
    accessorKey: 'status',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.status} />
    ),
    enableHiding: true,
  },
]

interface PopupProps {
  batchId: string
}

const ClaimSubmissionHistoryPopupBody = ({ batchId }: PopupProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<ClaimSubmissionHistoryDetail[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getClaimSubmissionHistoryDetail(batchId)
        setData(response)
        setIsLoading(false)
      } catch (error) {
        let message = ''
        if (typeof error === 'string') {
          message = error
        } else if (error instanceof Error) {
          message = error.message
        } else {
          message = JSON.stringify(error)
        }
        alert(`ERROR: ${message}`)
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
