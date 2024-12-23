import React, { useEffect, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateCell, TextCell } from '@/components'
import { formatDate } from '@/utils'
import { ClaimPayment, InsurancePayment } from '../types'
import { ActionsCell } from './actions-cell'
import { InsurancePaymentTableTabs } from './insurance-payment-table-tabs'
import { PaymentDetailHeader } from './payment-detail-header'
import { PaymentListTypes } from './types'

const columns: ColumnDef<ClaimPayment>[] = [
  {
    id: 'claimId',
    header: ({ column }) => <ColumnHeader column={column} label="Claim #" />,
    cell: ({ row }) => (
      <TextCell className="min-w-[235px]">{row.original.claimId}</TextCell>
    ),
  },
  {
    id: 'dateOfServiceFrom',
    header: ({ column }) => <ColumnHeader column={column} label="DOS From" />,
    cell: ({ row }) => (
      <DateCell>
        {formatDate(row.original.dateOfServiceFrom, 'MM/dd/yyyy')}
      </DateCell>
    ),
  },
  {
    id: 'dateOfServiceTo',
    header: ({ column }) => <ColumnHeader column={column} label="DOS To" />,
    cell: ({ row }) => (
      <DateCell>
        {formatDate(row.original.dateOfServiceTo, 'MM/dd/yyyy')}
      </DateCell>
    ),
  },
  {
    id: 'status',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Claim Status" />
    ),
    cell: ({ row }) => <TextCell>{row.original.claimStatusCode}</TextCell>,
  },
  {
    id: 'patientName',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Patient Name" />
    ),
    cell: ({ row }) => <TextCell>--</TextCell>,
  },
  {
    id: 'processedAsCode',
    header: ({ column }) => <ColumnHeader column={column} label="Process As" />,
    cell: ({ row }) => (
      <TextCell className="min-w-fit">{row.original.processedAsCode}</TextCell>
    ),
  },
  {
    id: 'billedAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Billed Amount" />
    ),
    cell: ({ row }) => (
      <TextCell hasPayment>{row.original.billedAmount}</TextCell>
    ),
  },
  {
    id: 'allowedAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Allowed Amount" />
    ),
    cell: ({ row }) => (
      <TextCell hasPayment>{row.original.allowedAmount}</TextCell>
    ),
  },
  {
    id: 'paidAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Paid Amount" />
    ),
    cell: ({ row }) => (
      <TextCell hasPayment>{row.original.paidAmount}</TextCell>
    ),
  },
  {
    id: 'noindex',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Patient Paid" />
    ),
    cell: ({ row }) => <TextCell>--</TextCell>,
  },
  {
    id: 'copayAmount',
    header: ({ column }) => <ColumnHeader column={column} label="Copay" />,
    cell: ({ row }) => (
      <TextCell hasPayment>{row.original.copayAmount}</TextCell>
    ),
  },
  {
    id: 'coinsuranceAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Co-Insurance" />
    ),
    cell: ({ row }) => (
      <TextCell hasPayment>{row.original.coinsuranceAmount}</TextCell>
    ),
  },
  {
    id: 'deductibleAmount',
    header: ({ column }) => <ColumnHeader column={column} label="Deductible" />,
    cell: ({ row }) => (
      <TextCell hasPayment>{row.original.deductibleAmount}</TextCell>
    ),
  },
  {
    id: 'otherPr',
    header: ({ column }) => <ColumnHeader column={column} label="Other PR" />,
    cell: ({ row }) => <TextCell hasPayment>{row.original.otherPr}</TextCell>,
  },
  {
    id: 'writeOffAmount',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Adjustment Amount" />
    ),
    cell: ({ row }) => (
      <TextCell hasPayment>{row.original.writeOffAmount}</TextCell>
    ),
  },
  {
    id: 'recordStatus',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

interface PaymentCheckHeaderProps {
  paymentDetail: InsurancePayment
}

const PaymentCheckTable = ({ paymentDetail }: PaymentCheckHeaderProps) => {
  const [claimPayments, setClaimPayments] = useState(
    paymentDetail.claimPayments,
  )
  const [paymentListType, setPaymentListType] = useState<PaymentListTypes>(
    PaymentListTypes.All,
  )

  useEffect(() => {
    setClaimPayments(
      paymentListType === PaymentListTypes.All
        ? paymentDetail.claimPayments
        : paymentDetail.claimPayments?.filter(
            (payment) => payment.status === paymentListType,
          ) ?? [],
    )
  }, [paymentListType])

  return (
    <Accordion.Root
      className="rounded-3 border-[2px] border-gray-3 "
      type="single"
      defaultValue="item-1"
      collapsible
    >
      <Accordion.Item className="shadow-sm " value="item-1">
        <PaymentDetailHeader />
        <Accordion.AccordionContent className="px-3 py-2">
          <InsurancePaymentTableTabs
            paymentListType={paymentListType}
            setPaymentListType={setPaymentListType}
          />
          <ScrollArea>
            <DataTable
              data={claimPayments ?? []}
              columns={columns}
              disablePagination
              sticky
            />
          </ScrollArea>
        </Accordion.AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { PaymentCheckTable }
