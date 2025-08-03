'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AddToNoteButton } from './add-to-note-button'
import { FilterForm } from './filter-form'
import { LabAndOrdersDetails } from './lab-and-orders-details'
import { LabAndOrdersHistoryTable } from './lab-and-orders-table'
import { useStore } from './store'

interface PhysicalExamHistoryProps {
  sectionName: QuickNoteSectionName
}

const HistoryView = ({ sectionName }: PhysicalExamHistoryProps) => {
  const { id: patientId } = useParams<{ id: string }>()
  const { fetchLabAndOrdersHistories, loading } = useStore((state) => ({
    fetchLabAndOrdersHistories: state.fetchLabAndOrdersHistories,
    loading: state.loading,
  }))

  useEffect(() => {
    if (!patientId) return

    fetchLabAndOrdersHistories(patientId, sectionName)
  }, [])

  return (
    <Flex direction="column" gap="2">
      <Flex gap="2">
        <AddToNoteButton sectionName={sectionName} />
        <FilterForm patientId={patientId} sectionName={sectionName} />
      </Flex>
      <Flex className="h-[calc(100dvh_-_235px)]">
        {loading ? (
          <LoadingPlaceholder className="h-full w-full" />
        ) : (
          <Flex className="w-full" gap="2">
            <LabAndOrdersHistoryTable />
            <LabAndOrdersDetails />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export { HistoryView }
