'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilterForm } from './filter-form'
import { useStore } from './store'
import { UdsDetails } from './uds-details'
import { UdsHistoryTable } from './uds-history-table'

interface UdsHistoryProps {
  patientId: string
  sectionName: QuickNoteSectionName
}

const HistoryView = ({ patientId, sectionName }: UdsHistoryProps) => {
  const { fetchUdsHistories, loading } = useStore((state) => ({
    fetchUdsHistories: state.fetchUdsHistories,
    loading: state.loading,
  }))

  useEffect(() => {
    if (!patientId) return

    fetchUdsHistories(patientId, sectionName)
  }, [])

  return (
    <Flex direction="column" gap="2">
      <FilterForm patientId={patientId} sectionName={sectionName} />
      <Flex className="h-[calc(100dvh_-_235px)]">
        {loading ? (
          <LoadingPlaceholder className="h-full w-full" />
        ) : (
          <>
            <UdsHistoryTable />
            <UdsDetails patientId={patientId} />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { HistoryView }
