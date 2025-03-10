'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getPaymentHistoryListAction } from '../../actions/get-payment-history-action'
import { ClaimAuditHistory, ClaimAuditHistoryPayload } from '../../types'
import { columns } from '../claimpayment-history-dialog/claim-payment-history-table'
import { InsurancePaymentHistoryFilterForm } from './insurance-payment-history-filter-form'

const InsurancePaymentHistoryTable = ({ paymentId }: { paymentId: string }) => {
  const [data, setData] = useState<ClaimAuditHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPaymentAuditHistory()
  }, [])

  const fetchPaymentAuditHistory = async (
    payload?: ClaimAuditHistoryPayload,
  ) => {
    setLoading(true)
    const reqPayload = {
      ...payload,
      id: paymentId,
    }
    const response = await getPaymentHistoryListAction(reqPayload)
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
        onFilterSubmit={fetchPaymentAuditHistory}
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

export { InsurancePaymentHistoryTable }
