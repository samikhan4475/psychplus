'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getPatientHistoryAction } from '@/actions'
import { DataTable, LoadingPlaceholder } from '@/components'
import { transformResponseData } from '../patient-lookup/transform'
import { columns } from './history-columns'
import { Users } from './types'

interface UsertHistoryTableProps {
  userId: number
}
const OrganizationUserHistoryTable = ({ userId }: UsertHistoryTableProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Users[]>([])

  useEffect(() => {
    setLoading(true)
    getPatientHistoryAction(userId?.toString(), {}).then((response) => {
      if (response.state === 'error') {
        toast.error(response.error)
      } else if (response.state === 'success') {
        setData(transformResponseData(response?.data ?? []))
      }
      setLoading(false)
    })
  }, [userId])

  if (loading) {
    return <LoadingPlaceholder className="h-20" />
  }

  return (
    <ScrollArea scrollbars="both" className="bg-white h-full p-2">
      <DataTable
        data={data}
        columns={columns}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        tableRowClass="relative"
        theadClass="z-[1]"
        disablePagination
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { OrganizationUserHistoryTable }
