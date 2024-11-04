'use client'

import React from 'react'
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateCell, TextCell } from '@/components'
import { formatDate } from '@/utils'
import { ClaimServiceLinePayment } from '../../types'
import CancelButton from './cancel-button'
import {
  AdjustmentReasonRemarkCell,
  AllowedAmountCell,
  BalanceAmountCell,
  CoInsuranceAmountCell,
  CopayAmountCell,
  DeductibleAmountCell,
  OtherprAmountCell,
  PaidAmountCell,
  WriteoffAmountCell,
} from './cells'
import { SaveAndPostButton } from './save-and-post-button'
import { SaveButton } from './save-button'

const columns: ColumnDef<ClaimServiceLinePayment>[] = [
  {
    id: 'chargeId',
    header: ({ column }) => (
      <ColumnHeader
        className="w-[75px]"
        column={column}
        label="Service Line #"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="flex w-[280px] items-center">
        {row.original.chargeId}
      </TextCell>
    ),
  },
  {
    id: 'dateOfServiceFrom',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="DOS From" />
    ),
    cell: ({ row }) => (
      <DateCell className="w-[108px]">
        {formatDate(row.original.dateOfServiceFrom.toString(), 'MM/dd/yyyy')}
      </DateCell>
    ),
  },
  {
    id: 'dateOfServiceTo',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="DOS To" />
    ),
    cell: ({ row }) => (
      <DateCell className="w-[108px]">
        {formatDate(row.original.dateOfServiceTo.toString(), 'MM/dd/yyyy')}
      </DateCell>
    ),
  },
  {
    id: 'cptCode',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="Procedure" />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[108px]">{row.original.cptCode}</TextCell>
    ),
  },
  {
    id: 'totalAmount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        className="w-[75px]"
        label="Billed Amount"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="flex w-[108px] items-center">
        <Text className="mr-1 text-[12px]">$</Text>
        {row.original.billedAmount}
      </TextCell>
    ),
  },
  {
    id: 'allowedAmount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        className="w-[110px]"
        label="Allowed Amount"
      />
    ),
    cell: AllowedAmountCell,
  },
  {
    id: 'paidAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} className="w-[75px]" label="Paid Amount" />
    ),
    cell: PaidAmountCell,
  },
  {
    id: 'balanceAmount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        className="w-[110px]"
        label="Balance Amount"
      />
    ),
    cell: BalanceAmountCell,
  },
  {
    id: 'copayAmount',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="Copay" />
    ),
    cell: CopayAmountCell,
  },
  {
    id: 'coinsuranceAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Co-Insurance" />
    ),
    cell: CoInsuranceAmountCell,
  },
  {
    id: 'deductibleAmount',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="Deductible" />
    ),
    cell: DeductibleAmountCell,
  },
  {
    id: 'otherPR',
    header: ({ column }) => (
      <ColumnHeader className="w-[75px]" column={column} label="Other-PR" />
    ),
    cell: OtherprAmountCell,
  },
  {
    id: 'writeOffAmount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        className="w-[120px]"
        label="Adjustment Amount"
      />
    ),
    cell: WriteoffAmountCell,
  },
  {
    id: 'adj-reason-remark',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Adjustment/Reason/Remark Code" />
    ),
    cell: AdjustmentReasonRemarkCell,
  },
]

interface InsurancePaymentPostingTableProps {
  claimServiceLinePayments: ClaimServiceLinePayment[]
  onCancel: () => void
}

const InsurancePaymentPostingTable = ({
  claimServiceLinePayments,
  onCancel,
}: InsurancePaymentPostingTableProps) => {
  return (
    <Flex direction="column">
      <Text mb="1" size="3" weight="bold">
        Service Lines
      </Text>

      <DataTable
        tableClass="[&_.rt-ScrollAreaRoot]:pb-2 max-w-[calc(100vw-23px)]"
        data={claimServiceLinePayments ?? []}
        columns={columns}
        disablePagination
      />

      <Flex justify="end" gapX="3" mt="3">
        <CancelButton onClick={onCancel} />
        <SaveButton />
        <SaveAndPostButton />
      </Flex>
    </Flex>
  )
}

export { InsurancePaymentPostingTable }
