'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getActiveVisitList } from '../actions'
import { ActiveVisit } from '../types'
import { columns } from './columns'

const ActiveVisitTable = () => {
  const [data, setData] = useState<ActiveVisit[]>([])
  const [loading, setLoading] = useState(false)

  const fetchActiveVisitList = async () => {
    setLoading(true)
    const response = await getActiveVisitList()
    if (response.state === 'error') {
      setLoading(false)
      return toast.error(response?.error)
    }
    setData(response.data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchActiveVisitList()
  }, [])

  if (loading) {
    return <LoadingPlaceholder className="min-h-96" />
  }

  return (
    <ScrollArea scrollbars="vertical" className="max-h-96">
      <DataTable
        columns={columns}
        data={data}
        sticky
        tableClass="bg-white"
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { ActiveVisitTable }
