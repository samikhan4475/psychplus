import React, { useEffect, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { formatDate } from '@/utils'
import { ClaimPayment, InsurancePayment } from '../types'
import { addSpaceToCamelCase } from '../utils'
import { ActionsCell } from './actions-cell'
import { InsurancePaymentTableTabs } from './insurance-payment-table-tabs'
import { PaymentDetailHeader } from './payment-detail-header'
import { useStore } from './store'
import { PaymentListTypes } from './types'
import { transformInClaimPayments } from './utils'

const getColumns = (includeUnlinked?: boolean): ColumnDef<ClaimPayment>[] => {
  return [
    {
      id: 'claimId',
      header: ({ column }) => <ColumnHeader column={column} label="Claim #" />,
      cell: ({ row }) => (
        <TextCell className="min-w-[80px]">{row.original.claimNumber}</TextCell>
      ),
    },
    {
      id: 'dateOfServiceFrom',
      header: ({ column }) => <ColumnHeader column={column} label="DOS From" />,
      cell: ({ row }) => (
        <DateCell>
          {row.original.dateOfServiceFrom
            ? formatDate(row.original.dateOfServiceFrom, 'MM/dd/yyyy')
            : ''}
        </DateCell>
      ),
    },
    {
      id: 'dateOfServiceTo',
      header: ({ column }) => <ColumnHeader column={column} label="DOS To" />,
      cell: ({ row }) => (
        <DateCell>
          {row.original.dateOfServiceTo
            ? formatDate(row.original.dateOfServiceTo, 'MM/dd/yyyy')
            : ''}
        </DateCell>
      ),
    },
    {
      id: 'claimStatusCode',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Claim Status" />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">{row.original.claimStatusCode}</TextCell>
      ),
    },
    {
      id: 'patientName',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Patient Name" />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">{`${
          row.original.patientName?.firstName ?? ''
        } ${row.original.patientName?.lastName ?? ''}`}</TextCell>
      ),
    },
    {
      id: 'processedAsCode',
      header: ({ column }) => (
        <ColumnHeader column={column} label="Process As" />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">
          {addSpaceToCamelCase(row.original.processedAsCode)}
        </TextCell>
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
      header: ({ column }) => (
        <ColumnHeader column={column} label="Deductible" />
      ),
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
      id: 'status',
      header: ({ column }) => <ColumnHeader column={column} label="Status" />,
      cell: ({ row }) => (
        <TextCell className="truncate">
          {addSpaceToCamelCase(row.original.status)}
        </TextCell>
      ),
    },
    {
      id: 'noindex',
      header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
      cell: ({ row }) => (
        <ActionsCell row={row} includeUnlinked={includeUnlinked} />
      ),
    },
  ]
}

interface PaymentCheckHeaderProps {
  paymentDetail: InsurancePayment
}

const PaymentCheckTable = ({ paymentDetail }: PaymentCheckHeaderProps) => {
  const {
    isLoading,
    claimPayments,
    paymentListType,
    setPaymentListType,
    setPaymentDetail,
    fetchClaimPayments,
  } = useStore((state) => ({
    isLoading: state.isLoading,
    claimPayments: state.claimPayments,
    paymentListType: state.paymentListType,
    setPaymentListType: state.setPaymentListType,
    setPaymentDetail: state.setPaymentDetail,
    fetchClaimPayments: state.fetchClaimPayments,
  }))

  useEffect(() => {
    setPaymentDetail(paymentDetail)
  }, [paymentDetail])

  useEffect(() => {
    fetchClaimPayments()
  }, [paymentListType])

  const claimStatusCodes = useCodesetCodes(CODESETS.ClaimStatus)

  return (
    <Accordion.Root
      className="rounded-3 border-[2px] border-gray-3 "
      type="single"
      defaultValue="item-1"
      collapsible
    >
      <Accordion.Item className="shadow-sm" value="item-1">
        <PaymentDetailHeader />
        <Accordion.AccordionContent className="px-3 py-2">
          <InsurancePaymentTableTabs
            paymentListType={paymentListType}
            setPaymentListType={setPaymentListType}
          />
          {isLoading ? (
            <LoadingPlaceholder className="bg-white min-h-[23vh]" />
          ) : (
            <DataTable
              data={transformInClaimPayments(claimStatusCodes, claimPayments)}
              columns={getColumns(
                paymentListType === PaymentListTypes.Unlinked,
              )}
              disablePagination
              tableClass="[&_.rt-ScrollAreaRoot]:pb-2 max-w-[calc(100vw-23px)]"
            />
          )}
        </Accordion.AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { PaymentCheckTable }
