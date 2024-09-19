'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '../../store'
import { Claim } from '../../types'
import { ClaimSubmissionRejectionDetailPopupDialog } from '../claim-submission-rejection-detail-popup-dialog'
import { RowActionDropdown } from './data-table-row.action'
import { FilterForm } from './filter-form'
import { TableCellClaimIdText } from './table-cell-claim-id-text'
import { TableCellLongText } from './table-cell-long-text'

const columns: ColumnDef<Claim>[] = [
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
    cell: ({ row }) => <TableCellClaimIdText maxWidth={100} row={row} />,
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
        title="Account #"
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
        text={`${row.original.dateOfServiceFrom}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'primaryPatientInsurancePlanId',
    accessorKey: 'primaryPatientInsurancePlanId',
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
        text={row.original.primaryInsurance?.payerName}
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
        title="Secondary Ins."
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.secondaryInsurance?.payerName}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'recordStatus',
    accessorKey: 'recordStatus',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.recordStatus} />
    ),
    enableHiding: true,
  },
  {
    id: 'totalAmount',
    accessorKey: 'totalAmount',
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
    id: 'amountDue',
    accessorKey: 'amountDue',
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
    id: 'metadata.createdOn',
    accessorKey: 'metadata.createdOn',
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
        text={`${row.original.metadata?.createdOn}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'submittedDate',
    accessorKey: 'submittedDate',
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
        text={row.original.submittedDate && `${row.original.submittedDate}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    cell: ({ row }) => <RowActionDropdown row={row} />,
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

const ClaimTable = () => {
  const claimList = useStore((state) => state.claimList)

  return (
    <>
      <ClaimSubmissionRejectionDetailPopupDialog />
      <Box className="shadow-lg">
        <Flex
          py="1"
          justify="start"
          className="border  border-[#b9b3b322] bg-[#fefdfd]"
        >
          <Text>Claims</Text>
        </Flex>
      </Box>
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

export { ClaimTable }
