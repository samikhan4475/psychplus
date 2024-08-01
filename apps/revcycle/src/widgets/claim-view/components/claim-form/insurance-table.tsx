'use client'

import {
  DataTable,
  DataTableColumnHeader
} from '@psychplus/ui/data-table'
import { type ColumnDef } from '@tanstack/react-table'
import { RowActionDropdown } from './data-table-row.action'
import { TableCellLongText } from './table-cell-long-text'

interface InsuranceData {
  coverage: string
  insuranceName: string
  policyNumber: string
  relationship: string
  address: string
  payerAddress: string
  status: string
}

const columns: ColumnDef<InsuranceData>[] = [
  {
    id: 'coverage',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Coverage"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.coverage} />
    ),
    enableHiding: true,
  },
  {
    id: 'insuranceName',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Insurance Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={130} text={row.original.insuranceName} />
    ),
    enableHiding: true,
  },
  {
    id: 'policyNumber',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Policy Number"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.policyNumber} />
    ),
    enableHiding: true,
  },
  {
    id: 'relationship',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Relationship"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.relationship} />
    ),
    enableHiding: true,
  },
  {
    id: 'address',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Address"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.address} />
    ),
    enableHiding: true,
  },
  {
    id: 'payerAddress',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Payer Address"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.payerAddress} />
    ),
    enableHiding: true,
  },
  {
    id: 'status',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.status} />
    ),
    enableHiding: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    cell: () => <RowActionDropdown />,
  },
]

const dummyData: InsuranceData[] = [
  {
    coverage: 'Primary',
    insuranceName: 'BCBS- Insurance 1',
    policyNumber: '78910',
    relationship: '18 Self',
    address: '217 Mackenzie Drive',
    payerAddress: '-',
    status: 'New Charge',
  },
  {
    coverage: 'Secondary',
    insuranceName: '1199 National Insurance',
    policyNumber: '10987',
    relationship: '18 Self',
    address: '217 Mackenzie Drive',
    payerAddress: '-',
    status: 'N/A',
  },
]

const InsuranceTable = () => {

  return (
    <DataTable
      data={dummyData}
      columns={columns}
      tableClass="border border-solid border-[lightgray] "
      tHeadClass="bg-[#EBF3FC]"
      thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
      isRowPan={true}
      toBodyClass="border-[lightgray]; border-b border-solid"
      columnCellClass="border border-solid border-[#F2F2F2] w-50"
    />
  )
}

export { InsuranceTable }

