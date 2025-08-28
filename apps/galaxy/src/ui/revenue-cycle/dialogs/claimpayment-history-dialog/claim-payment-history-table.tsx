'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils'
import { getClaimPaymentHistoryListAction } from '../../actions/get-claimpayments-history-action'
import { ClaimAuditHistory, ClaimAuditHistoryPayload } from '../../types'
import { InsurancePaymentHistoryFilterForm } from '../insurance-payment-history-dialog/insurance-payment-history-filter-form'

const excludedKeys = ['Id', 'PostedBy']

const columns: ColumnDef<ClaimAuditHistory>[] = [
  {
    id: 'metadata.updatedOn',
    accessorKey: 'metadata.updatedOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/Time" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[120px]">
        {formatDateTime(
          row.original.metadata.updatedOn ?? row.original.metadata.createdOn,
        )}
      </TextCell>
    ),
  },
  {
    id: 'metadata.updatedByFullName',
    accessorKey: 'metadata.updatedByFullName',
    header: ({ column }) => (
      <ColumnHeader label="Name" column={column} clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell className="w-[120px]">
        {row.original.metadata.updatedByFullName ??
          row.original.metadata.createdByFullName ??
          ''}
      </TextCell>
    ),
  },
  {
    id: 'sectionName',
    accessorKey: 'sectionName',
    header: ({ column }) => (
      <ColumnHeader label="Section" column={column} clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.sectionName}</TextCell>,
  },

  {
    id: 'fieldName',
    accessorKey: 'fieldName',
    header: ({ column }) => (
      <ColumnHeader label="Field" column={column} clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.fieldName}</TextCell>,
  },
  {
    id: 'oldValue',
    accessorKey: 'oldValue',
    header: ({ column }) => (
      <ColumnHeader label="Previous Value" column={column} clientSideSort />
    ),
    cell: ({ row }) => {
      const { oldValue, fieldName } = row.original
      const hasPayment =
        !isNaN(Number(oldValue)) && !excludedKeys.includes(fieldName)

      return (
        <TextCell hasPayment={hasPayment}>{row.original.oldValue}</TextCell>
      )
    },
  },
  {
    id: 'newValue',
    accessorKey: 'newValue',
    header: ({ column }) => (
      <ColumnHeader label="Current Value" column={column} clientSideSort />
    ),
    cell: ({ row }) => {
      const { newValue, fieldName } = row.original
      const hasPayment =
        !isNaN(Number(newValue)) && !excludedKeys.includes(fieldName)

      return <TextCell hasPayment={hasPayment}>{newValue}</TextCell>
    },
  },
]

const ClaimPaymentHistoryTable = ({ paymentId }: { paymentId: string }) => {
  const [data, setData] = useState<ClaimAuditHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClaimPaymentHistory()
  }, [])

  const fetchClaimPaymentHistory = async (
    payload?: ClaimAuditHistoryPayload,
  ) => {
    setLoading(true)
    const reqPayload = {
      ...payload,
      id: paymentId,
    }
    const response = await getClaimPaymentHistoryListAction(reqPayload)
    if (response.state === 'success') {
      setData(response.data)
    } else if (response.state === 'error') {
      toast.error(response.error ?? 'Failed to get history')
    }
    setLoading(false)
  }

  return (
    <>
      <InsurancePaymentHistoryFilterForm
        onFilterSubmit={fetchClaimPaymentHistory}
      />
      {loading ? (
        <Flex height="100%" align="center" justify="center">
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <ScrollArea>
          <DataTable
            data={data}
            columns={columns}
            disablePagination
            sticky
            tableClass="h-[400px]"
          />
        </ScrollArea>
      )}
    </>
  )
}

export { ClaimPaymentHistoryTable, columns }
