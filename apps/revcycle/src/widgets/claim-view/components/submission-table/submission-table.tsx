'use client'

import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '../../store'
import { Claim } from '../../types'
import { ClaimNumberCell } from './claim-number-cell'
import { FilterForm } from './filter-form'
import { TableCellLongText } from './table-cell-long-text'
import { TableHeaderCheckbox } from './table-header-checkbox'
import { TableRowCheckbox } from './table-row-checkbox'

const columns: ColumnDef<Claim>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <TableHeaderCheckbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={table.toggleAllPageRowsSelected}
        />
      )
    },
    cell: ({ row }) => {
      return (
        <TableRowCheckbox
          claimId={row.original.id}
          checked={row.getIsSelected()}
          onCheckedChange={row.toggleSelected}
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'claimNumber',
    accessorKey: 'claimNumber',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Claim #"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <ClaimNumberCell
        claimId={row.original.id}
        text={row.original.claimNumber}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'patientName',
    accessorKey: 'patientName',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Patient Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={130} text={row.original.patientName} />
    ),
    enableHiding: true,
  },
  {
    id: 'patientAccountNumber',
    accessorKey: 'patientAccountNumber',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="MRN #"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.patientAccountNumber}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'dos',
    accessorKey: 'dos',
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
        text={row.original.dateOfServiceFrom?.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'primaryInsurance',
    accessorKey: 'primaryInsurance',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Location"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.primaryPatientInsurancePlanId?.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'primaryInsurance',
    accessorKey: 'primaryInsurance',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Primary Ins."
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.primaryPatientInsurancePlanId?.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'secondaryPatientInsurancePlanId',
    accessorKey: 'secondaryPatientInsurancePlanId',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Secondary"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.secondaryPatientInsurancePlanId?.toString()}
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
        title="Claim Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.recordStatus} />
    ),
    enableHiding: true,
  },
  {
    id: 'totalCharge',
    accessorKey: 'totalCharge',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Charge"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.totalAmount.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'dueAmount',
    accessorKey: 'dueAmount',
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
        maxWidth={120}
        text={row.original.amountDue.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'createdOn',
    accessorKey: 'createdOn',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created On"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.amountDue?.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'submittedOn',
    accessorKey: 'submittedOn',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Submitted On"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={`${row.original.submittedDate}`}
      />
    ),
    enableHiding: true,
  },
]

const DataTableFooter = (table: any) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const SubmissionTable = ({ type }: { type: 'electronic' | 'paper' }) => {
  const claimList = useStore((state) => state.claimList)
  return (
    <>
      <FilterForm />
      <DataTable
        data={claimList}
        columns={columns}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
        renderFooter={DataTableFooter}
      />
    </>
  )
}

export { SubmissionTable }
