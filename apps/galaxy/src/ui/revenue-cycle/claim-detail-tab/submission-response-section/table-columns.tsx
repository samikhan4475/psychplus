import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'

interface SubmissionResponseType {
  entrydate: string
  statusdate: string
  status: string
  patientaccount: string
  response: string
  responsefrom: string
  payercontrol: string
  categorycode: string
  statuscode: string
}

const columns = (sort?: Sort): ColumnDef<SubmissionResponseType>[] => {
  return [
    {
      id: 'entryDate',
      accessorKey: 'entryDate',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Entry Date"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.entrydate}</TextCell>,
      enableHiding: true,
    },
    {
      id: 'statusDate',
      accessorKey: 'statusDate',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Status Date"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.statuscode}</TextCell>,
      enableHiding: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Patient Account"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.patientaccount}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'response',
      accessorKey: 'response',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Response From"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.responsefrom}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'categoryCode',
      accessorKey: 'categoryCode',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Category Code"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.categorycode}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'statusCode',
      accessorKey: 'statusCode',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Status Code"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.statuscode}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'payerControl',
      accessorKey: 'payerControl',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Payer Control"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payercontrol}</TextCell>,

      enableHiding: true,
    },
  ]
}

export { columns }
