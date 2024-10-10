'use client'

import { useEffect, useState } from 'react'
import { Button, Flex, Spinner } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { getPatientTransactionsHistoryAction } from '../actions'
import { useStore } from '../store'
import { PatientTransaction } from '../types'

const CollapseCell = ({ row }: PropsWithRow<PatientTransaction>) => {
  const [loading, setLoading] = useState(false)
  const { data, setData, page } = useStore((state) => ({
    data: state.data,
    setData: state.setData,
    page: state.page,
  }))

  useEffect(() => {
    if (row.getIsExpanded()) {
      row.toggleExpanded(false)
    }
  }, [page])

  const handleCollapseOpen = async () => {
    if (row.getIsExpanded()) {
      row.toggleExpanded(false)
      return
    }

    if (row?.original.subRows) {
      row.toggleExpanded(true)
      return
    }

    setLoading(true)
    const response = await getPatientTransactionsHistoryAction({
      patientId: row.original.patientId,
      transactionId: row.original.id,
    })

    if (response.state === 'error') {
      toast.error(response.error)
    } else if (response.state === 'success' && data?.paymentHistory) {
      const updatedData = data?.paymentHistory.patientTransactions.map(
        (transaction) => {
          if (transaction.id === row.original.id) {
            return {
              ...transaction,
              subRows: response.data,
            }
          }
          return transaction
        },
      )
      setData({
        ...data,
        paymentHistory: {
          ...data?.paymentHistory,
          patientTransactions: updatedData,
        },
      })
      row.toggleExpanded(true)
    }
    setLoading(false)
  }

  return (
    row?.depth === 0 && (
      <Flex justify="center" align="center" width="100%" height="100%">
        {loading ? (
          <Spinner />
        ) : (
          <Button
            onClick={handleCollapseOpen}
            className="text-black !outline-none"
            type="button"
            variant="ghost"
            color="gray"
            size="1"
            disabled={loading}
          >
            {row.getIsExpanded() ? (
              <ChevronDownIcon size={16} />
            ) : (
              <ChevronRightIcon size={16} />
            )}
          </Button>
        )}
      </Flex>
    )
  )
}

export { CollapseCell }
