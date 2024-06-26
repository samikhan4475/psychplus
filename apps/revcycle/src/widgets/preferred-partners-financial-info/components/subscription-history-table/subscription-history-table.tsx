import { useEffect, useState } from 'react'
import { Flex, Strong, Text } from '@radix-ui/themes'
import { type ColumnDef, type Table } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTableResetFilterButton,
  DataTableRowActions,
  type RowAction,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { getSubscriptionsHistory } from '../../api.client'
import { useStore } from '../../store'
import { CreditCard } from '../../types'
import { CreditCardRowActionSetPrimary } from './credit-card-row-action-set-primary'

const rowActions: RowAction<CreditCard>[] = [
  {
    id: 'credit-card-row-action-set-primary',
    render: CreditCardRowActionSetPrimary,
  },
]

const DataTableHeader = (table: Table<any>) => {
  return (
    <Flex justify="between" py="3">
      <Flex align="center" gap="4">
        <Text as="label">
          <Strong>Subscription History</Strong>
        </Text>
        <DataTableResetFilterButton table={table} />
      </Flex>
    </Flex>
  )
}

const columns: ColumnDef<any>[] = [
  {
    id: 'date',
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date & Time"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.date} />,
  },
  {
    id: 'chargeType',
    accessorKey: 'chargeType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Charge Type"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.chargeType} />,
  },
  {
    id: 'billingFrequency',
    accessorKey: 'billingFrequency',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Billing Frequency"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.billingFrequency} />,
  },
  {
    id: 'paymentDescription',
    accessorKey: 'paymentDescription',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Payment Description"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.paymentDescription} />,
  },
  {
    id: 'totalChargeAmount',
    accessorKey: 'totalChargeAmount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Charge Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.totalChargeAmount} />,
  },

  {
    id: 'transactionId',
    accessorKey: 'transactionId',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Transaction ID"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.transactionId} />,
  },

  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Action"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} actions={rowActions} />,
  },
]

const SubscriptionHistoryTable = () => {
  const preferredPartnerId: string = useStore(
    (state) => state.preferredPartnerId,
  )
  const [subscriptionList, setSubscriptionList] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      const response = await getSubscriptionsHistory(preferredPartnerId)
      setSubscriptionList(response)
    })()
  }, [])

  return (
    <DataTable
      data={subscriptionList}
      columns={columns}
      renderHeader={DataTableHeader}
      tableClass="border border-solid border-[lightgray] "
      tHeadClass="bg-[#EBF3FC]"
      thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
      isRowPan={true}
      toBodyClass="border-[lightgray]; border-b border-solid"
      columnCellClass="border border-solid border-[#F2F2F2] w-50"
    />
  )
}

export { SubscriptionHistoryTable }
