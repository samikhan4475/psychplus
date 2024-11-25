'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilterForm } from './filter-form'
import { HospitalInitialDetails } from './hospital-initial-details'
import { HospitalInitialHistoryTable } from './hospital-initial-history-table'
import { useStore } from './store'

interface PhysicalExamHistoryProps {
  patientId: string
  sectionName: QuickNoteSectionName
}

const HistoryView = ({ patientId, sectionName }: PhysicalExamHistoryProps) => {
  const { fetchHospitalInititalHistories, loading } = useStore((state) => ({
    fetchHospitalInititalHistories: state.fetchHospitalInititalHistories,
    loading: state.loading,
  }))

  useEffect(() => {
    if (!patientId) return

    fetchHospitalInititalHistories(patientId, sectionName)
  }, [])

  return (
    <Flex direction="column" gap="2">
      <FilterForm patientId={patientId} sectionName={sectionName} />
      <Flex className="h-[calc(100dvh_-_235px)]">
        {loading ? (
          <LoadingPlaceholder className="h-full w-full" />
        ) : (
          <>
            <HospitalInitialHistoryTable />
            <HospitalInitialDetails patientId={patientId} />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export { HistoryView }
