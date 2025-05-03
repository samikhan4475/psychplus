'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getMedicationHistoryListAction } from '../actions'
import { MedicationHistoryPayload, MedicationHistoryResponse } from '../types'
import { columns } from './columns'
import { MedicationHistoryFilterForm } from './medication-history-form'

const MedicationHistoryTable = ({
  pharmacyNotificationId,
}: {
  pharmacyNotificationId: string
}) => {
  const [data, setData] = useState<MedicationHistoryResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuditHistory()
  }, [])

  const fetchAuditHistory = async (reqPayload?: MedicationHistoryPayload) => {
    setLoading(true)
    const payload = {
      ...reqPayload,
      id: pharmacyNotificationId,
    }
    const response = await getMedicationHistoryListAction({ payload })
    setLoading(false)
    if (response.state === 'error') {
      setData([])
      toast.error(response.error)
    } else {
      setData(response.data)
    }
  }

  return (
    <>
      <MedicationHistoryFilterForm onFilterSubmit={fetchAuditHistory} />
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

export { MedicationHistoryTable }
