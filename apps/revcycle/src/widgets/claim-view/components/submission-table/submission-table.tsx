'use client'

import {
  createDataTableSelectColumn,
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { useStore } from '../../store'
import { Claim } from '../../types'
import { FilterForm } from './filter-form'
import { TableCellLongText } from './table-cell-long-text'

// Function to create column definitions
const createColumn = (
  id: string,
  accessorKey: keyof Claim,
  title: string,
  maxWidth: number
): ColumnDef<Claim> => ({
  id,
  accessorKey,
  size: 50,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={title} className="text-[#000]" />
  ),
  cell: ({ row }) => (
    <TableCellLongText maxWidth={maxWidth} text={row.original[accessorKey]?.toString()} />
  ),
  enableHiding: true,
})

const columns: ColumnDef<Claim>[] = [
  createDataTableSelectColumn(),
  createColumn('claimNumber', 'claimNumber', 'Claim #', 100),
  createColumn('patientName', 'patientName', 'Patient Name', 130),
  createColumn('patientAccountNumber', 'patientAccountNumber', 'MRN #', 120),
  createColumn('dos', 'dos', 'DOS', 100),
  createColumn('locationId', 'locationId', 'Location', 120),
  createColumn('primaryInsurance', 'primaryInsurance', 'Primary Ins.', 120),
  createColumn('secondaryPatientInsurancePlanId', 'secondaryPatientInsurancePlanId', 'Secondary', 120),
  createColumn('status', 'status', 'Claim Status', 120),
  createColumn('totalCharge', 'totalCharge', 'Total Charge', 120),
  createColumn('dueAmount', 'dueAmount', 'Due Amount', 120),
  createColumn('createdOn', 'createdOn', 'Created On', 120),
  createColumn('submittedOn', 'submittedOn', 'Submitted On', 120),
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
