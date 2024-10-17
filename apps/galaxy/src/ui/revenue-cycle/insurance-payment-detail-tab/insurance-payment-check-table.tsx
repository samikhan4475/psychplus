import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateCell, TextCell } from '@/components'
import { Claim } from '@/types'
import { formatDate } from '@/utils'
import { InsurancePayment } from '../types'
import { InsurancePaymentTableTabs } from './insurance-payment-table-tabs'
import { PaymentDetailHeader } from './payment-detail-header'

const columns: ColumnDef<Claim>[] = [
  {
    id: 'claimNumber',
    header: ({ column }) => <ColumnHeader label="Claim #" sortable />,
    cell: ({ row }) => {
      return <TextCell>{row.original.claimNumber}</TextCell>
    },
  },
  {
    id: 'dosFrom',
    header: ({ column }) => <ColumnHeader label="Dos From" sortable />,
    cell: ({ row }) => {
      return <DateCell>{formatDate(row.original.dateOfServiceFrom)}</DateCell>
    },
  },
  {
    id: 'dosTo',
    header: ({ column }) => <ColumnHeader label="Dos To" sortable />,
    cell: ({ row }) => {
      return <DateCell>{formatDate(row.original.dateOfServiceTo)}</DateCell>
    },
  },
  {
    id: 'claimStatus',
    header: ({ column }) => <ColumnHeader label="Claim Status" sortable />,
    cell: ({ row }) => {
      return <TextCell>{row.original.claimStatusCode}</TextCell>
    },
  },
  {
    id: 'patientName',
    header: ({ column }) => <ColumnHeader label="Patient Name" sortable />,
    cell: ({ row }) => {
      return <TextCell>{row.original.patientName}</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Process As" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Billed Amount" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Allowed Amount" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Paid Amount" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Patient Paid" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Copay" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Co-Insurance" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Deductible" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Other PR" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Adjustment Amount" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Status" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
  {
    id: 'noindex',
    header: ({ column }) => <ColumnHeader label="Actions" sortable />,
    cell: ({ row }) => {
      return <TextCell>-</TextCell>
    },
  },
]

interface PaymentCheckHeaderProps {
  paymentDetail: InsurancePayment
}

const PaymentCheckTable = ({ paymentDetail }: PaymentCheckHeaderProps) => {
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
          <InsurancePaymentTableTabs />
          <ScrollArea>
            <DataTable data={[]} columns={columns} disablePagination sticky />
          </ScrollArea>
        </Accordion.AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { PaymentCheckTable }
