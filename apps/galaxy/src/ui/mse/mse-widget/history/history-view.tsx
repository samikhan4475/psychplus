'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { MseDetails } from './mse-details'
import { FilterForm } from './mse-filter-form'
import { MseHistoryTable } from './mse-history-table'
import { useStore } from './store'

interface PhysicalExamHistoryProps {
  patientId: string
  sectionName: QuickNoteSectionName
}

const HistoryView = ({ patientId, sectionName }: PhysicalExamHistoryProps) => {
  const { fetchPhysicalExamHistories, loading } = useStore((state) => ({
    fetchPhysicalExamHistories: state.fetchPhysicalExamHistories,
    loading: state.loading,
  }))

  useEffect(() => {
    if (!patientId) return
    fetchPhysicalExamHistories(patientId, sectionName)
  }, [patientId, sectionName])

  return (
    <Flex direction="column" gap="2">
      <FilterForm patientId={patientId} sectionName={sectionName} />
      <Flex className="h-[calc(100dvh_-_235px)]">
        {loading ? (
          <LoadingPlaceholder className="h-full w-full" />
        ) : (
          <>
            <MseHistoryTable />
            <MseDetails patientId={patientId} />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { HistoryView }
