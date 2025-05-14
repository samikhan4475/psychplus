'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getExternalReferralPatientHistoryAction } from './actions'
import { columns } from './external-referral-history-columns'
import { transformResponseData } from './transform'
import { Patient } from './types'

interface ExternalReferralHistoryTableProps {
  externalreferralId: number
}
const ExternalReferralHistoryTable = ({
  externalreferralId,
}: ExternalReferralHistoryTableProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Patient[]>([])

  useEffect(() => {
    setLoading(true)
    getExternalReferralPatientHistoryAction(
      externalreferralId?.toString(),
      {},
    ).then((response) => {
      if (response.state === 'error') {
        toast.error(response.error)
      } else if (response.state === 'success') {
        setData(transformResponseData(response?.data ?? []))
      }
      setLoading(false)
    })
  }, [externalreferralId])

  if (loading) {
    return <LoadingPlaceholder className="h-20" />
  }
  return (
    <ScrollArea className="max-h-44 p-2">
      <DataTable
        columns={columns}
        data={data}
        sticky
        theadClass="z-[1]"
        disablePagination
      />
    </ScrollArea>
  )
}

export { ExternalReferralHistoryTable }
