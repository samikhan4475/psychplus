import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { ClaimSubmissionResponse, Sort } from '@/types'
import { formatDate } from '@/utils'

const columns = (sort?: Sort): ColumnDef<ClaimSubmissionResponse>[] => {
  return [
    {
      id: 'entryDate',
      accessorKey: 'entryDate',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Entry Date"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {formatDate(`${row.original.entryDate}`, 'MM/dd/yyyy')}
        </TextCell>
      ),
      enableHiding: true,
    },

    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Status"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'patientAccount',
      accessorKey: 'patientAccount',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Patient Account"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.patientAccount}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'response',
      accessorKey: 'response',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Response"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.response}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'responseFrom',
      accessorKey: 'responseFrom',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Response From"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.receiverName}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'categoryCode',
      accessorKey: 'categoryCode',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Category Code"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.categoryCode}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'statusCode',
      accessorKey: 'statusCode',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Status Code"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.statusCode}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'payerControl',
      accessorKey: 'payerControl',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Payer Control"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerControlNumber}</TextCell>,

      enableHiding: true,
    },
  ]
}

export { columns }
