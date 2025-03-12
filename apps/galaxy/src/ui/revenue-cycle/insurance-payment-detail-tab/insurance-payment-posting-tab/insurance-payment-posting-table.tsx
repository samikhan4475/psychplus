'use client'

import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatDate, sanitizeFormData } from '@/utils'
import { getPaymentServiceLinesAction } from '../../actions'
import { useStore } from '../../insurance-payment-tab/store'
import { useStore as useTabStore } from '../../store'
import { ClaimServiceLinePayment, InsurancePayment } from '../../types'
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
import { transformServiceLines } from './data'
import { SaveAndPostButton } from './save-and-post-button'
import { SaveButton } from './save-button'
import { SchemaType } from './schema'

const columns = (
  paymentDetail: InsurancePayment,
): ColumnDef<ClaimServiceLinePayment>[] => [
  {
    id: 'chargeId',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Service Line #" />
    ),
    cell: ({ row }) => (
      <TextCell className="flex min-w-[70px] items-center">
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
        {row.original.dateOfServiceFrom
          ? formatDate(row.original.dateOfServiceFrom.toString(), 'MM/dd/yyyy')
          : ''}
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
        {row.original.dateOfServiceTo
          ? formatDate(row.original.dateOfServiceTo.toString(), 'MM/dd/yyyy')
          : ''}
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
      <ColumnHeader
        column={column}
        label="Adjustment/Reason/Remark Code/Amount"
      />
    ),
    cell: ({ row }) => (
      <AdjustmentReasonRemarkCell
        paymentDetail={paymentDetail}
        row={row}
        key={row.index}
      />
    ),
  },
]

interface InsurancePaymentPostingTableProps {
  onCancel: () => void
  paymentDetail: InsurancePayment
}

const InsurancePaymentPostingTable = ({
  onCancel,
  paymentDetail,
}: InsurancePaymentPostingTableProps) => {
  const form = useFormContext<SchemaType>()

  const [loading, setLoading] = useState(true)

  const activeTab = useTabStore((state) => state.activeTab)

  const paymentPostingClaim = useStore(
    (state) => state.paymentPostingClaim[activeTab],
  )
  const processedAsCode = form.watch('processedAsCode')

  useEffect(() => {
      ;(async () => {
        setLoading(true)
        const payload = sanitizeFormData({
          processedAsCode,
          claimNumber: paymentPostingClaim?.claimNumber,
          claimPaymentId: paymentPostingClaim?.paymentId ?  paymentPostingClaim?.id : '',
        })

        const result = await getPaymentServiceLinesAction(payload)
        if (result.state === 'success') {
          form.setValue(
            'claimServiceLinePayments',
            transformServiceLines(
              result.data,
              paymentPostingClaim ?? {},
              processedAsCode
            ) as ClaimServiceLinePayment[],
          )
        } else {
          toast.error(result.error ?? 'Failed to get service lines')
        }

        setLoading(false)
      })()
    
  }, [processedAsCode])
  if (loading)
    return <LoadingPlaceholder className="min-h-[30vh] min-w-[300px]" />
  const serviceLines = form.watch('claimServiceLinePayments')

  return (
    <Flex direction="column">
      <Text mb="1" size="3" weight="bold">
        Service Lines
      </Text>

      <DataTable
        tableClass="[&_.rt-ScrollAreaRoot]:pb-2 max-w-[calc(100vw-23px)]"
        data={serviceLines}
        columns={columns(paymentDetail)}
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
