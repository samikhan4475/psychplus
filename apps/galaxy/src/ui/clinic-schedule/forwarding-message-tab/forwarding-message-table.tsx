'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

interface ForwardingMessageTableProps {
  userId: number
}
const ForwardingMessageTable = ({ userId }: ForwardingMessageTableProps) => {
  const { data, loading, fetchForwardingMessageList } = useStore((state) => ({
    data: state.data,
    fetchForwardingMessageList: state.fetchForwardingMessageList,
    loading: state.loading,
  }))
  useEffect(() => {
    fetchForwardingMessageList({ userIds: [userId] })
  }, [fetchForwardingMessageList, userId])
  if (loading) {
    return <LoadingPlaceholder />
  }
  return (
    <ScrollArea scrollbars="horizontal" className="h-full w-full p-2">
      <DataTable
        columns={columns}
        data={data ?? []}
        theadClass="z-[1]"
        sticky
      />
    </ScrollArea>
  )
}

export { ForwardingMessageTable }
