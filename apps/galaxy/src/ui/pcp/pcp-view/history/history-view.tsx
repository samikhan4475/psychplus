'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { FilterForm } from './filter-form'
import { HxTable } from './hx-table'
import { useStore } from './store'

interface PhysicalExamHistoryProps {
  patientId: string
}

const HistoryView = ({ patientId }: PhysicalExamHistoryProps) => {
  const { fetchPcpHistories, loading } = useStore((state) => ({
    fetchPcpHistories: state.fetchPcpHistories,
    loading: state.loading,
  }))

  useEffect(() => {
    if (!patientId) return
    fetchPcpHistories(patientId)
  }, [patientId])

  return (
    <>
      <FilterForm patientId={patientId} />

      <Flex className="h-[calc(100dvh_-_235px)] pt-2">
        {loading ? (
          <LoadingPlaceholder className="h-full w-full" />
        ) : (
          <HxTable />
        )}
      </Flex>
    </>
  )
}

export { HistoryView }
