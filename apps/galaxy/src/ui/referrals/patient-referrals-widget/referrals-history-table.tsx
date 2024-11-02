'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { PatientReferral } from '@/types'
import { getPatientReferralsHistoryAction } from './actions'
import { columns } from './referrals-history-columns'

interface ReferralsHistoryTableProps {
  referralId: string
}
const ReferralsHistoryTable = ({ referralId }: ReferralsHistoryTableProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PatientReferral[]>([])

  useEffect(() => {
    setLoading(true)
    getPatientReferralsHistoryAction({ referralId }).then((response) => {
      if (response.state === 'error') {
        toast.error(response.error)
      } else if (response.state === 'success') {
        setData(response?.data ?? [])
      }
      setLoading(false)
    })
  }, [referralId])

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

export { ReferralsHistoryTable }
