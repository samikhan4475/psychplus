'use client'

import { useEffect } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { getInsurancePaymentsList } from '../../api.client'
import { useStore } from '../../store'
import { InsurancePayment } from '../../types'
import { InsurancePaymentDialog } from '../insurance-payment-dialog'
import { RowActionDropdown } from './data-table-row.action'
import { FilterForm } from './filter-form'
import { TableCellClaimIdText } from './table-cell-claim-id-text'
import { TableCellLongText } from './table-cell-long-text'

const columns: ColumnDef<InsurancePayment>[] = [
  {
    id: 'checkNumber',
    accessorKey: 'checkNumber',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Check Number"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellClaimIdText maxWidth={100} row={row} />,
    enableHiding: true,
  },
  {
    id: 'paymentType',
    accessorKey: 'paymentType',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Payment Type"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={130} text={row.original.paymentType} />
    ),
    enableHiding: true,
  },
  {
    id: 'insuranceName',
    accessorKey: 'insuranceName',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Insurance Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.insuranceName} />
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
        title="Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={`${row.original.amount}`} />
    ),
    enableHiding: true,
  },
  {
    id: 'checkDate',
    accessorKey: 'checkDate',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Check Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.checkDate?.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'receivedDate',
    accessorKey: 'receivedDate',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Received Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.receivedDate?.toString()}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'noindex', // noindex is here because right now we are not mapping any value against this column
    accessorKey: 'noindex',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Claim"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText maxWidth={120} text={'0'} />,
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
      <TableCellLongText maxWidth={120} text={row.original.status} />
    ),
    enableHiding: true,
  },
  {
    id: 'noindex',
    accessorKey: 'noindex',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Posted Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText maxWidth={120} text={'0'} />,
    enableHiding: true,
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Unposted Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={`${row.original.amount}`} />
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

const InsurancePaymentTable = () => {
  const {
    insurancePaymentsList,
    setInsurancePaymentRefetchData,
    setInsurancePaymentsList,
    insurancePaymentRefetchData,
  } = useStore((state) => ({
    insurancePaymentsList: state.insurancePaymentsList,
    setInsurancePaymentRefetchData: state.setInsurancePaymentRefetchData,
    insurancePaymentRefetchData: state.insurancePaymentRefetchData,
    setInsurancePaymentsList: state.setInsurancePaymentsList,
  }))

  useEffect(() => {
    ;(async () => {
      if (insurancePaymentRefetchData) {
        const response = await getInsurancePaymentsList()
        setInsurancePaymentsList(response)
        setInsurancePaymentRefetchData(false)
      }
    })()
  }, [insurancePaymentRefetchData])

  return (
    <>
      <Box className="shadow-lg">
        <Flex
          py="1"
          justify="start"
          className="border  border-[#b9b3b322] bg-[#fefdfd]"
        >
          <Box className="flex-1">
            <Text className="font-bold">Insurance Payment</Text>
          </Box>

          <Box className="flex-1">
            <Flex justify="end">
              <InsurancePaymentDialog />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <FilterForm />
      <DataTable
        data={insurancePaymentsList}
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

export { InsurancePaymentTable }
