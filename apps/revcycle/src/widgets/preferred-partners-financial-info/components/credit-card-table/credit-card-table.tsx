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
import { RadioGroup } from '@psychplus/ui/radio-group'
import { AddCreditCardButton } from '..'
import { getPreferredPartnerCards } from '../../api.client'
import { useStore } from '../../store'
import { CreditCard } from '../../types'
import { useAddCreditCard } from '../add-credit-card/hooks'
import { CreditCardRowActionEdit } from './credit-card-row-action-edit'
import { CreditCardRowActionSetPrimary } from './credit-card-row-action-set-primary'
import { CreditCardRowActionSetUse } from './credit-card-row-action-set-use'
import { TableCellLongText } from './table-cell-long-text'

const rowActions: RowAction<CreditCard>[] = [
  {
    id: 'credit-card-row-action-set-primary',
    render: CreditCardRowActionSetPrimary,
  },
  {
    id: 'credit-card-row-action-edit',
    render: CreditCardRowActionEdit,
  },
]

const DataTableHeader = (table: Table<CreditCard>) => {
  return (
    <Flex justify="between" py="3">
      <Flex align="center" gap="4">
        <Text as="label">
          <Strong>Cards</Strong>
        </Text>
        <DataTableResetFilterButton table={table} />
      </Flex>
      <Flex align="center" gap="4">
        <AddCreditCardButton />
      </Flex>
    </Flex>
  )
}

const NoTableHeader = (table: Table<CreditCard>) => {
  return <></>
}

const columns: ColumnDef<CreditCard>[] = [
  {
    id: 'cardType',
    accessorKey: 'cardType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Types of Cards"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <>
        {row.original.cardType}{' '}
        {row.original.isPrimary && (
          <Text className="rounded-sm border-1 ml-5 border-solid border-[#BE980091] bg-[#FFDD011F] p-2 text-[#BE980091]">
            Primary
          </Text>
        )}
      </>
    ),
  },
  {
    id: 'cardNumber',
    accessorKey: 'cardNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Credit/Debit Card #"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={`**** **** **** ${row.original.numberLastFour}`}
        row={row.original}
      />
    ),
  },
  {
    id: 'nameOnCard',
    accessorKey: 'nameOnCard',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name on Card"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.name} row={row.original} />
    ),
  },
  {
    id: 'expirationDate',
    accessorKey: 'expirationDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Expiration Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={`${row.original.expireMonth}/${row.original.expireYear
          .toString()
          .slice(-2)}`}
        row={row.original}
      />
    ),
  },
  {
    id: 'zipcode',
    accessorKey: 'zipcode',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Billing Zip Code"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={`${row.original.billingAddress.postalCode}`}
        row={row.original}
      />
    ),
  },
  {
    id: 'cardStatus',
    accessorKey: 'cardStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Card Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <>
        {row.original.isActive && (
          <Text className="rounded-sm bg-[#02BA3C16] p-2 text-[#006B3BE7]">
            Active
          </Text>
        )}

        {!row.original.isActive && (
          <Text className="rounded-sm bg-[#FF050508] p-2 text-[#BB0007D5]">
            Expired
          </Text>
        )}
      </>
    ),
  },
  {
    id: 'useCard',
    accessorKey: 'useCard',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Use Card"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <CreditCardRowActionSetUse row={row} />,
  },

  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} actions={rowActions} />,
  },
]

const CreditCardTable = ({ isOutSide }: { isOutSide?: boolean }) => {
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const [listData, setListData] = useState<CreditCard[]>([])
  const { isDialogOpen } = useAddCreditCard()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getPreferredPartnerCards(preferredPartnerId)
        setListData(data)
      } catch (error) {
        setListData([])
      }
    })()
  }, [isDialogOpen])

  return (
    <RadioGroup.Root defaultValue="1">
      <DataTable
        data={listData}
        columns={columns}
        renderHeader={isOutSide ? NoTableHeader : DataTableHeader}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
        isPreferredPartnerTable={true}
      />
    </RadioGroup.Root>
  )
}

export { CreditCardTable }
